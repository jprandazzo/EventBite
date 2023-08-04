json.key_format! camelize: :lower

json.user do
    json.id @user.id
    json.firstName @user.first_name
    json.lastName @user.last_name
    json.email @user.email
    # json.img_url @user.profile_photo.url
    json.organized_events Event.all.where(organizer_id: @user.id).order('timestamp_start asc').map(&:id) if Event.all.where(organizer_id: @user.id)
    json.attending_events @user.attending_events.map(&:id)
    json.orders @user_orders.order(:created_at).map(&:id).reverse! if @user_orders
    json.liked_events @user.liked_events.map(&:id)
end


json.events do
    if @user_organized_events
        @user_organized_events.each do |event| 
            json.set! event.id, {
                id: event.id, 
                title: event.title,
                organizerName: event.organizer_name,
                venueName: event.venue_name,
                address: event.address,
                timestampStart: event.timestamp_start,
                timestampEnd: event.timestamp_end,
                eventType: event.event_type,
                eventCategory: event.event_category,
                capacity: event.capacity,
                ticketsSold: event.tickets_sold,
                price: event.price.to_i,
                description: event.description,
                tix_sold: event.orders.count,
                imgUrl: event.photo.url
            }
        end
    end

    if @user_attending_events
        @user_attending_events.each do |event| 
            json.set! event.id, {
                id: event.id, 
                title: event.title,
                organizerName: event.organizer_name,
                venueName: event.venue_name,
                address: event.address,
                timestampStart: event.timestamp_start,
                timestampEnd: event.timestamp_end,
                eventType: event.event_type,
                eventCategory: event.event_category,
                capacity: event.capacity,
                ticketsSold: event.tickets_sold,
                price: event.price.to_i,
                description: event.description,
            }
        end
    end

    if @user.liked_events
        @user.liked_events do |event|
            json.set! event.id, {
                id: event.id, 
                title: event.title,
                organizerName: event.organizer_name,
                venueName: event.venue_name,
                address: event.address,
                timestampStart: event.timestamp_start,
                timestampEnd: event.timestamp_end,
                eventType: event.event_type,
                eventCategory: event.event_category,
                capacity: event.capacity,
                ticketsSold: event.tickets_sold,
                price: event.price.to_i,
                description: event.description
            }
        end
    end
end

json.orders do
    if @user_orders
        @user_orders.each do |order| 
            json.set! order.id, {
                id: order.id,
                eventId: order.event_id,
                ticketholderId: order.ticketholder_id,
                numTickets: order.num_tickets,
                createdAt: order.created_at
            }
        end
    end
end

json.likes do 
    if @user.likes
        @user.likes do |like|
            json.set! like.id, {
                id: like.id,
                eventId: like.event_id,
                likerId: @user.id
            }
        end
    end
end