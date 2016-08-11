class HomeController < ApplicationController
  def index
    @new_game = GameInstance.new
  end
end
