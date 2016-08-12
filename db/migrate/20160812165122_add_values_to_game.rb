class AddValuesToGame < ActiveRecord::Migration
  def change
    remove_column :game_instances, :game_attributes, :string
    add_column :game_instances, :jump_power, :integer, default: 350
    add_column :game_instances, :down_method, :string, default: ""
  end
end
