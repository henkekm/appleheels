class AddStatusToGameInstance < ActiveRecord::Migration
  def change
    add_column :game_instances, :status, :string
  end
end
