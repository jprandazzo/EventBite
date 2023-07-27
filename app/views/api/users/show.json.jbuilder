json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :created_at
    json.img_url @user.profile_photo.url
end