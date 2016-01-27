#file: gen_locale_list.rb

require 'rubygems'
require 'log4r'
require 'erb'
require 'mechanize'

if RUBY_VERSION != "2.1.7"
  require 'win32/clipboard' 
  include Win32
else 
  require 'clipboard'
  require 'iconv'
end

include Log4r

class Generator
  def initialize
    @log = Log4r::Logger.new("Generator")
    @log.outputters << Outputter.stdout
    @source_lang_id = "it"
    if RUBY_VERSION == "1.8.6"
      # the service works but some words with accent are not translated and for it->de is pretty useless
      @agent = Mechanize.new #accent words in source like è à are not working, but it works in 2.1.7 with iconv
    else
      # arguments inserted to make it working with  2.1.7
      @agent = Mechanize.new{|a| a.ssl_version, a.verify_mode = 'SSLv3', OpenSSL::SSL::VERIFY_NONE}
    end
    @agent.set_proxy('172.28.0.53', '3128')
  end
  
  def create_single(msg_det, lang_id = "it")
    @log.debug("Processing '#{msg_det}', language '#{lang_id}''")
    template_item = get_template_item
    result = ""
    template = ERB.new(template_item)
    name_lbl = get_label_name(msg_det, 'msgl1')
    tmp_arr = translate_msg_det_and_original_text(msg_det, lang_id)
    original_text = tmp_arr[0]
    msg_det = tmp_arr[1]
    aString = template.result(binding)
    result += aString
    copy_to_clipboard(result)
  end
  
  def run(string_list_fname, lang_id = "it")
    @log.debug "Processing the file #{string_list_fname}"

    template_item = get_template_item
    result = ",\n"
    template = ERB.new(template_item)
    
    labels = {}
    File.open(string_list_fname).each_line do |line|
      msg_det = line.gsub("\'", "").gsub("\n", '')
      name_lbl = get_label_name(msg_det)
      if labels.has_key?(name_lbl)
        if labels[name_lbl][:content] == msg_det
          @log.debug "ignore #{name_lbl} because already done"
          next
        else
          newname = "#{name_lbl}_#{labels[name_lbl][:count]}"
          @log.debug "Same key #{name_lbl}, but different content, create #{newname} as different key"
          labels[name_lbl][:count] += 1
          name_lbl = newname
        end
      end
      
      # NOTE: the translation list is ISO-8859-1, the result from google is also in ISO-8859-1,
      #       but erb and clipboard are working in utf-8, so there is a need of a conversion.
      #       msg_det.encode('utf-8').encode is silently not working because a converter is missed 
      #       and in this case Iconv.conv is used instead
      
      tmp_arr = translate_msg_det_and_original_text(msg_det, lang_id)
      original_text = tmp_arr[0]
      msg_det = tmp_arr[1]
      
      labels[name_lbl] = {:content => msg_det, :count => 1}
      
      aString = template.result(binding)
      result += aString
    end
    copy_to_clipboard(result)
    
  end

  private 
  
  def get_template_item
        template_item = 
<<-LIST
    "<%= name_lbl %>": {
        "message": "<%= msg_det %>",
        "_orig": "<%= original_text %>"
    },
LIST
    return template_item
  end
 
  def transalte(text_to_transl, lang_id)
    result = text_to_transl
    #use simply the service root. Source and destination are selected using the form.
    @url_compl = "https://translate.google.com"
    #@log.debug "Translate strings from '#{@source_lang_id}' into '#{lang_id}' using the service: #{@url_compl}"
    page  = @agent.get(@url_compl)
    
    form = page.form_with(:name => 'text_form')
    #puts "Campi del form: "
    #form.fields.each { |f| p f;}
    
    #@log.debug "Search translation for '#{text_to_transl}'"
    form['text'] = text_to_transl
    form["sl"] = @source_lang_id #source field
    form["tl"] = lang_id #destination field
    #p form["sl"] 
    #p form["tl"] 
    
    page_result = nil
    begin
      page_result  = @agent.submit(form)
    rescue 
      @log.error "Something goes wrong, ignore #{text_to_transl}"
      return text_to_transl
    end
    doc =  page_result.root
    candidate = ''
    doc.xpath('//span[@id="result_box"]').each do |link|
      #p link
      coded_out_raw =  link.inner_html()
      # con link.content ho dei problemi sulla conversione dei caratteri tedeschi
      if coded_out_raw =~ /<span.*>(.*)</
        #puts $1
        candidate = $1
      else
        raise "result not found for #{text_to_transl}" 
      end
    end
    #@log.debug "#{text_to_transl} => #{candidate}"
    result = candidate
    return result
  end
  
  def create_urls(lang_id, text_to_transl)
    #use simply the service root. Source and destination are selected using the form.
    @url_compl = "https://translate.google.com"
  end
  
  def get_label_name(msg_det, prefix = 'msg')
    if RUBY_VERSION != "1.8.6"
      msg_det = Iconv.conv('utf-8', 'ISO-8859-1', msg_det)
    end
    lblname_candidate = msg_det.gsub(' ', '_').downcase.gsub(':', '_').gsub('\\', '_').gsub(',', '').gsub('/', '_').gsub('(', '').gsub('.','').gsub('à', 'a').gsub('è', 'e').gsub('ù', 'u').gsub('ò', 'o').gsub('"', '')
    lblname_candidate = lblname_candidate[0..10] if lblname_candidate.length > 10
    name_lbl = lblname_candidate
    name_lbl = "#{prefix}__#{lblname_candidate}"
    return name_lbl
  end
  
  def translate_msg_det_and_original_text(msg_det, lang_id)
    luz_trans = msg_det
    if lang_id != @source_lang_id 
      luz_trans = transalte(msg_det, lang_id)
    end
    if RUBY_VERSION != "1.8.6"
      original_text = Iconv.conv('utf-8', 'ISO-8859-1', msg_det)
      msg_det = Iconv.conv('utf-8', 'ISO-8859-1',  luz_trans) #Iconv.new(to, from)
    else
      original_text = msg_det
      msg_det = luz_trans
    end
    return [original_text, msg_det]
  end
  
  def copy_to_clipboard(result)
    puts result
    if RUBY_VERSION == "2.1.7"
      Clipboard.copy(result)
    else
      Clipboard.set_data result
    end
  end
  
end


if $0 == __FILE__
  # NOTE: to build the list, copied into the clipboard, user ruby 1.9.3. For developement it is enough the 1.8.6.
  fname = File.dirname(__FILE__) + "/string_list.txt"
  gen = Generator.new
  #gen.run(fname, 'en')
  gen.create_single('Tempo effettivo', 'it')
  
  
end