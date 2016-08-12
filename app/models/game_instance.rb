class GameInstance < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_one :game_attribute
end
