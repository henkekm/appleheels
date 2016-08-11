class GameInstancesController < ApplicationController
  include GameUrlHelper
  before_action :find_game_instance, only: [:show, :update]

  def create
    @game_instance = GameInstance.create(name: unique_game_name,
                                         status: "playing")
    redirect_to @game_instance
  end

  def show
  end

  def update
    @game_instance.increment!(:test_value, 1)
    render js: "$('#game-score').html('#{@game_instance.test_value}')"
  end

  def random
    if GameInstance.any?
      redirect_to GameInstance.all.sample
    else
      redirect_to root_path
    end
  end

  private
  def find_game_instance
    @game_instance = GameInstance.friendly.find(params[:id])
  end
end
