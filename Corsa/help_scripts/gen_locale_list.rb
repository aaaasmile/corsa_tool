#file: gen_locale_list.rb

require 'rubygems'
require 'log4r'
require 'erb'

include Log4r

class Generator
  def initialize
    @log = Log4r::Logger.new("Generator")
    @log.outputters << Outputter.stdout
  end
  
  def run(string_list_fname)
    @log.debug "Processing the file #{string_list_fname}"
    template_item = 
<<-LIST
    "<%= name_lbl %>": {
        "message": "<%= msg_det %>"
    },
LIST
    result = ",\n"
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
      labels[name_lbl] = {:content => msg_det, :count => 1}
      template = ERB.new(template_item)
      aString = template.result(binding)
      result += aString + "\n"
    end
    puts result
    
  end

  def get_label_name(msg_det)
    lblname_candidate = msg_det.gsub(' ', '_').downcase.gsub(':', '_')
    lblname_candidate = lblname_candidate[0..10] if lblname_candidate.length > 10 
    name_lbl = "msg__#{lblname_candidate}"
    return name_lbl
  end
  
end


if $0 == __FILE__
  fname = File.dirname(__FILE__) + "/string_list.txt"
  gen = Generator.new
  gen.run(fname)
  
end