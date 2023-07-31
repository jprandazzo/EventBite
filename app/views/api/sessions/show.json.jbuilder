json.key_format! camelize: :lower

json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :created_at
    json.img_url @user.profile_photo.url
    json.organized_events Event.all.where(organizer_id: @user.id).map(&:id)
    json.tickets ['test1 - replace in users.show.jbuilder']
end