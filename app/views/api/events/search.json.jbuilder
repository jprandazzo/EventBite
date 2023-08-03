# json.key_format! camelize: :lower
json.events({})

json.events do 
    @events.each do |event| 
        json.set! event.id, {
            id: event.id, 
            title: event.title,
            organizerName: event.organizer_name,
            organizerId: event.organizer_id,
            venueName: event.venue_name,
            address: event.address,
            timestampStart: event.timestamp_start,
            timestampEnd: event.timestamp_end,
            eventType: event.event_type,
            eventCategory: event.event_category,
            capacity: event.capacity,
            ticketsSold: event.tickets_sold,
            price: event.price,
            description: event.description,
        }
    end

end