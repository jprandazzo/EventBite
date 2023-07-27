# :events = {}
# Event.all.map do |event|
#     events[event.id] = {id: event.id, title: event.title}
# end

json.events do 
    Event.all.each {|event| json.set! event.id, {id: event.id, title: event.title}}
end