class ItemsController < ApplicationController
    def new
        @item = Item.new
        # @item.images.new
        # セレクトボックスの初期値
        @category_parent_array = ["---"]
        # データベースから、親カテゴリーのみを抽出し、配列化
        Category.where(ancestry: nil).each do |parent|
            @category_parent_array << parent.name
    end
end

    # 以下全て、formatはjsonのみ
    # 親カテゴリーが選択された後に動くアクション
    def get_category_children
        # 選択された親カテゴリーに紐付く子カテゴリーの配列を取得
        @category_children = Category.find_by(name: "#{params[:parent_name]}",ancestry: nil).children
    end

    #子カテゴリーが選択された後に動くアクション
    def get_category_grandchildren
        # 選択された子カテゴリーに紐付く孫カテゴリーの配列を取得
        @category_grandchildren = Category.find("#{params[:child_id]}").children
    end
    #孫カテゴリーが選択された後に動くアクション
    def get_size
        selected_grandchild = Category.find("#{params[:grandchild_id]}")  #孫カテゴリーを取得
        if related_size_parent = selected_grandchild.items_sizes[0] #孫カテゴリーの親と紐付くサイズ（親）があれば取得
            @sizes = related_size_parent.children #紐づいたサイズ（親）の子供の配列を取得
        else
            selected_child = Category.find("#{params[:grandchild_id]}").parent #孫カテゴリーの親を取得
            if related_size_parent = selected_child.items_sizes[0] #孫カテゴリーの親と紐付くサイズ（親）があれば取得
                @sizes = related_size_parent.children #紐づいたサイズ（親）の子供の配列を取得
            end
        end
    end
end
