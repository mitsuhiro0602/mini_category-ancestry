class CreateItemsSizes < ActiveRecord::Migration[5.2]
  def change
    create_table :items_sizes do |t|
      t.integer :size
      t.timestamps
    end
  end
end
