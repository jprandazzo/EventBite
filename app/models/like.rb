# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  event_id   :bigint
#  liker_id   :bigint
#
# Indexes
#
#  index_likes_on_event_id  (event_id)
#  index_likes_on_liker_id  (liker_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (liker_id => users.id)
#
class Like < ApplicationRecord
    belongs_to :liker, class_name: :User, foreign_key: :liker_id
    belongs_to :event

    def self.create!(params)
        like = Like.new(liker_id: params[:liker_id], event_id: params[:event_id])
        like.save unless Like.find_by(liker_id: like.liker_id, event_id: like.event_id)
    end
end
