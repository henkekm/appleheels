class GameInstancesController < ApplicationController
  include GameUrlHelper
  before_action :find_game_instance, only: [:show, :update]

  def create
    @game_instance = GameInstance.create(name: unique_game_name)
    redirect_to @game_instance
  end

  def show
  end

  def update
    @game_instance.update_attributes(game_params)
    if @game_instance.status == "won"
      redirect_to game_instance_path(@game_instance.slug)
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

  def game_params
    params.require(:game_instance).permit(:jump_power, :down_method, :status, :objectives)
  end
  def find_game_instance
    @game_instance = GameInstance.friendly.find(params[:id])
  end
end
