class AddAncestryToItemsSizes < ActiveRecord::Migration[5.2]
  def change
    add_column :items_sizes, :ancestry, :string
    add_index :items_sizes, :ancestry
  end
end
