$(function(){
    // カテゴリーセレクトボックスのオプションを作成
    function appendOption(category){
        var html = `<option value="${category.name}" data-category="${category.id}">${category.name}</option>`;
        return html;
    }
    // 子カテゴリーの表示作成
    function appendChildrenBox(insertHTML){
        var childSelectHtml = '';
        childSelectHtml = `<div class='listing-select-wrapper__added' id= 'children_wrapper'>
                            <div class='listing-select-wrapper__box'>
                                <select class="listing-select-wrapper__box--select" id="child_category" name="category_id">
                                    <option value="---" data-category="---">---</option>
                                    ${insertHTML}
                                <select>
                            <i class='fas fa-chevron-down listing-select-wrapper__box--arrow-down'></i>
                            </div>
                        </div>`;
        $('.listing-product-detail__category').append(childSelectHtml);
    }
    // 孫カテゴリーの表示作成
    function appendGrandchidrenBox(insertHTML){
        var grandchildSelectHtml = '';
        grandchildSelectHtml = `<div class='listing-select-wrapper__added' id= 'grandchildren_wrapper'>
                                <div class='listing-select-wrapper__box'>
                                    <select class="listing-select-wrapper__box--select" id="grandchild_category" name="category_id">
                                        <option value="---" data-category="---">---</option>
                                    ${insertHTML}
                                    <select>
                                    <i class='fas fa-chevron-down listing-select-wrapper__box--arrow-down'></i>
                                </div>
                            </div>`;
        $('.listing-product-detail__category').append(grandchildSelectHtml);
    }
    // 親カテゴリー選択後のイベント
    $('#parent_category').on('change', function(){
        var parentCategory = document.getElementById('parent_category').value; //選択された親カテゴリーの名前を取得
        if (parentCategory != "---"){ //親カテゴリーが初期値でないことを確認
            $.ajax({
                url: 'get_category_children',
                type: 'GET',
                data: { parent_name: parentCategory },
                dataType: 'json'
            })
            .done(function(children){
                $('#children_wrapper').remove(); //親が変更された時、子以下を削除するする
                $('#grandchildren_wrapper').remove();
                $('#size_wrapper').remove();
                $('#brand_wrapper').remove();
                var insertHTML = '';
                // children.forEach(function (item){
                //     console.log("done")
                // })
                children.forEach(function(child){
                    insertHTML += appendOption(child);
                });
                console.log(children);
                appendChildrenBox(insertHTML);
            })
            .fail(function(){
                alert('カテゴリー取得に失敗しました');
            })
        }else{
            $('#children_wrapper').remove(); //親カテゴリーが初期値になった時、子以下を削除するする
            $('#grandchildren_wrapper').remove();
            $('#size_wrapper').remove();
            $('#brand_wrapper').remove();
        }
    });
    // 子カテゴリー選択後のイベント
    $('.listing-product-detail__category').on('change', '#child_category', function(){
        var childId = $('#child_category option:selected').data('category'); //選択された子カテゴリーのidを取得
        if (childId != "---"){ //子カテゴリーが初期値でないことを確認
            $.ajax({
                url: 'get_category_grandchildren',
                type: 'GET',
                data: { child_id: childId },
                dataType: 'json'
            })
            .done(function(grandchildren){
                if (grandchildren.length != 0) {
                    $('#grandchildren_wrapper').remove(); //子が変更された時、孫以下を削除するする
                    $('#size_wrapper').remove();
                    $('#brand_wrapper').remove();
                    var insertHTML = '';
                    grandchildren.forEach(function(grandchild){
                        insertHTML += appendOption(grandchild);
                    });
                appendGrandchidrenBox(insertHTML);
                }
            })
            .fail(function(){
                alert('カテゴリー取得に失敗しました');
            })
        }else{
            $('#grandchildren_wrapper').remove(); //子カテゴリーが初期値になった時、孫以下を削除する
            $('#size_wrapper').remove();
            $('#brand_wrapper').remove();
        }
    });
    //サイズセレクトボックスのオプション作成
    function appendSizeOption(size){
        var html = `<option value="${size.size}">${size.size}</option>`;
        return html;
    }
    // サイズ・ブランド入力欄の表示作成
    function appendSizeBox(insertHTML){
        var sizeSelectHtml = '';
        sizeSelectHtml = `<div class="listing-product-detail__size" id= 'size_wrapper'>
                            <label class="listing-default__label" for="サイズ">サイズ</label>
                            <span class='listing-default-require'>必須</span>
                            <div class='listing-select-wrapper__added--size'>
                                <div class='listing-select-wrapper__box'>
                                    <select class="listing-select-wrapper__box--select" id="size" name="size_id">
                                        <option value="---">---</option>
                                        ${insertHTML}
                                    <select>
                                    <i class='fas fa-chevron-down listing-select-wrapper__box--arrow-down'></li>
                                </div>
                            </div>
                        </div>`;
        $('.listing-product-detail__category').append(sizeSelectHtml);
    }
    // 孫のカテゴリー選択後のイベント
    $('.listing-product-detail__category').on('change', '#grandchild_category', function (){
        var grandchildId = $('#grandchild_category option:selected').data('category'); //選択された孫のカテゴリーのidを取得
        if (grandchildId != "---"){
            //孫カテゴリーが初期値でないことを確認
            $.ajax({
                url: 'get_size',
                type: 'GET',
                data: { grandchild_id: grandchildId},
                dataType: 'json'
            })
            .done(function (sizes){
                $('#size_wrapper').remove(); //孫が変更された時、サイズ欄以下を削除する
                $('#brand_wrapper').remove();
                if(sizes.length != 0){
                var insertHTML = '';
                    sizes.forEach(function(size){
                        insertHTML += appendSizeOption(size);
                    });
                    appendSizeBox(insertHTML);
                }
            })
            .fail(function (){
                alert('サイズ取得に失敗しました');
            })
        }else{
            $('#size_wrapper').remove(); //孫カテゴリーが初期値になった時、サイズ欄以下を削除する
            $('#brand-wrapper').remove();
        }
    });
});