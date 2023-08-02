json.key_format! camelize: :lower

json.like do
    json.extract! @like, id, :liker_id, :event_id
end