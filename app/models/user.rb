# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#
class User < ApplicationRecord
    validates :email, :first_name, :last_name, :password_digest, presence: true
    validates :email, uniqueness:true
    validates :password, length: {minimum: 6}, allow_nil:true
    validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
    has_secure_password

    has_one_attached :profile_photo
    has_many :organized_events, class_name: :Event, foreign_key: :organizer_id, inverse_of: :organizer
    # has_many :orders, inverse_of: :ticketholder

    before_validation :ensure_session_token

    def attending_events
        Event.joins(:orders).where(orders: {ticketholder_id: self.id}).distinct
    end

    def orders
        Order.where(ticketholder_id: self.id)
    end

    def self.find_by_credentials(email, pw)
        user = User.find_by(email: email)

        if user &.authenticate(pw)
            user
        else
            # render status: "No user found with that email/password combination. Please try again"
            nil
        end
    end

    def generate_session_token
        loop do
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

    def reset_session_token!
        self.session_token = generate_session_token
        save!
        self.session_token

    end
end
