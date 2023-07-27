# :events = {}
# Event.all.map do |event|
#     events[event.id] = {id: event.id, title: event.title}
# end

json.events do 
    Event.all.each do |event| 
        json.set! event.id, {
            id: event.id, 
            title: event.title,
            organizerName: event.organizer_name
            venueName: event.venue_name,
            address: event.address,
            timestampStart: event.timestamp_start,
            timestampEnd: event.timestamp_end,
            type: event.type,
            category: event.category,
            capacity: event.capacity,
            ticketsSold: event.tickets_sold
        }
    end

    # Event.all.each do |event| 
    #     json.set! event.id.to_s {json.extract! event, :id, :title}
    # end

    # Event.all.each do |event| 
    #     id = event.id.to_s
    #     obj = json.extract! event, :id, :title
    #     json.set! id, obj
    # end
end