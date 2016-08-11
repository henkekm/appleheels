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
    # @game_instance.increment!(:test_value, 1)
    if @game_instance.update_attributes(game_params)
      render js: "$('#game-score').html('#{@game_instance.test_value}')"
    end
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

  def game_params
    params.require(:game_instance).permit(:game_attributes, :status, :objectives)
  end
end
