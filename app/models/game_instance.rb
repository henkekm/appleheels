class GameInstance < ActiveRecord::Base
  extend FriendlyId
  include TwitterHelper
  friendly_id :name, use: :slugged

  def shut_down
    send_tweet("The #{self.name} game was shut down!")
  end
end
