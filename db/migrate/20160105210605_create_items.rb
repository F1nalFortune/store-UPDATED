class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :category
      t.string :name
      t.string :description
      t.string :quantity
      t.string :price

      t.timestamps null: false
    end
  end
end
