json.key_format! camelize: :lower

json.order do
    json.extract! @order, :event_id, :ticketholder_id
end

json.event do
    json.extract! @event, 
        :id, :title, 
        :organizer_name, :organizer_id,
        :timestamp_start, :timestamp_end,
        :venue_name, :address, 
        :price, :capacity, :tickets_sold,
        :event_category, :event_type,
        :description
end