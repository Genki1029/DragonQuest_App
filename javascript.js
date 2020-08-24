/**************************************************
* 各種変数
**************************************************/

    // 各入力値を受け取る定数を宣言
    const input1 = document.getElementById("input1");
    const input2 = document.getElementById("input2");
    const input3 = document.getElementById("input3");
    const input4 = document.getElementById("input4");

    // ボタンを受け取る定数を宣言
    const exec_btn = document.getElementById("execute");
    const reset_btn = document.getElementById("reset");

    // 出力先となる「おすすめの種族」を受け取る定数を宣言
    const output1 = document.getElementById("output1");
    const output2 = document.getElementById("output2");
    const output3 = document.getElementById("output3");
    const output4 = document.getElementById("output4");

    // 出力時のコメント表示部分の定数を定義
    const output_comment = document.getElementById("output_comment");

    // 各出力値（種族）の変数を定義
    let slime = {index: 1, name: "スライム系", point: 0};
    let beast = {index: 2, name: "けもの系", point: 0};
    let dragon = {index: 3, name: "ドラゴン系", point: 0};
    let phantom = {index: 4, name: "怪人系", point: 0};
    let bird = {index: 5, name: "鳥系", point: 0};
    let zombie = {index: 6, name: "ゾンビ系", point: 0};
    let material = {index: 7, name: "物質系", point: 0};
    let devil = {index: 8, name: "あくま系", point: 0};
    let machine = {index: 9, name: "マシン系", point: 0};
    let element = {index: 10, name: "エレメント系", point: 0};

    // 出力値をoutputs配列に格納
    let outputs = [
        slime, beast, dragon, phantom, bird, zombie, material, devil, machine, element
    ];

    // 各種flag
    let flag_error = false; // エラーが発生しているかどうか
    let flag_result = false; // 結果が表示されたかどうか

/**************************************************
* 実行結果
**************************************************/
    // 「この種族で決定！」ボタンを押したときの挙動 
    exec_btn.addEventListener("click", () => {
        // 入力値をinputs配列に格納
        let inputs = [
        input1.value, input2.value, input3.value, input4.value
        ];

        // 入力値にエラー値が含まれていないかのチェック
            // 空欄が含まれている場合にエラーメッセージを出力
            errorCheck_blank(inputs);

        // 入力値をログ確認
        console.log(inputs);
        
        // 各入力値に対して該当の種族ごとの関数を呼び出し、point計算をする
        inputs.forEach(input => {
            switch(input) {
                case "slime" :
                    vsSlime();
                    break;
                case "beast" :
                    vsBeast();
                    break;
                case "dragon" :
                    vsDragon();
                    break;
                case "phantom" :
                    vsPhantom();
                    break;
                case "bird" :
                    vsBird();
                    break;
                case "zombie" :
                    vsZombie();
                    break;
                case "material" :
                    vsMaterial();
                    break;
                case "devil" :
                    vsDevil();
                    break;
                case "machine" :
                    vsMachine();
                    break;
                case "element" :
                    vsElement();
                    break;
            }
        });

        // 出力用種族のpoint計算結果をログ出力
        console.log(outputs);

        // 出力用種族のpointが大きい順に並び替える
        sortPointByDesc(outputs);
        console.log(outputs);

        // 「おすすめの種族」に上位4種族を表示する
        showResult();

        // flag_resultをtrueにする
        flag_result = true;

        // エラーが発生していなければ、resetボタンを押せるようにする
        // 「この種族で決定！」ボタンをdisabledにする
        disabledExecButton();
        activeResetButton();
    });


    // リセットボタンをクリックしたときの挙動
    reset_btn.addEventListener("click", () => {
        initResult(outputs);
    });


/**************************************************
* 種族別にpoint計算を振り分ける関数
**************************************************/
    function vsSlime() {
        plusPoint([bird, devil]);
        minusPoint([beast, element]);
    }

    function vsBeast() {
        plusPoint([slime, bird]);
        minusPoint([dragon, phantom]);
    }

    function vsDragon() {
        plusPoint([beast, machine]);
        minusPoint([bird, devil]);   
    }

    function vsPhantom() {
        plusPoint([beast, devil]);
        minusPoint([zombie, material]);
    }

    function vsBird() {
        plusPoint([dragon, element]);
        minusPoint([slime, beast]);
    }

    function vsZombie() {
        plusPoint([phantom, element]);
        minusPoint([material, machine]);
    }

    function vsMaterial() {
        plusPoint([phantom, zombie]);
        minusPoint([machine, element]);
    }

    function vsDevil() {
        plusPoint([dragon, machine]);
        minusPoint([slime, phantom]);
    }

    function vsMachine() {
        plusPoint([zombie, material]);
        minusPoint([dragon, devil]);
    }

    function vsElement() {
        plusPoint([slime, material]);
        minusPoint([bird, zombie]);
    }


/**************************************************
* 出力用種族のpointに加算・減算する関数 + 降順並び替えをする関数
**************************************************/
    function plusPoint(races) {
        races.forEach(race => {
            race.point += 1;
        });
    }

    function minusPoint(races) {
        races.forEach(race => {
            race.point -= 1;
        });
    }

    function sortPointByDesc(outputs) {
        outputs.sort((a, b) => {
            if(a.point > b.point) return -1;
            if(a.point < b.point) return 1;
            return 0;
        });
        return outputs;
    }


/**************************************************
* 結果表示用の関数
**************************************************/
    function showResult() {
        output1.innerHTML = `${outputs[0].name} (Point: ${outputs[0].point})`;
        output2.innerHTML = `${outputs[1].name} (Point: ${outputs[1].point})`;
        output3.innerHTML = `${outputs[2].name} (Point: ${outputs[2].point})`;
        output4.innerHTML = `${outputs[3].name} (Point: ${outputs[3].point})`;
        output_comment.innerHTML = "「Point」が0（ゼロ）の場合、<br>どの種族を選択してもOKです！";
    }


/**************************************************
* リセット操作関連の関数
**************************************************/
    function initResult(outputs) {
        location.reload();
        // // セレクトボックスの選択項目を初期化する
        // input1.selectedIndex = 0;
        // input2.selectedIndex = 0;
        // input3.selectedIndex = 0;
        // input4.selectedIndex = 0;

        // // 出力用種族のpointをすべて0に戻す
        // outputs.forEach((output) => {
        //     output.point = 0;
        //     console.log(outputs);
        // });

        // // 出力用種族の並びをリセットする
        // outputs.sort((a, b) => {
        //     if(a.index > b.index) return 1;
        //     if(a.index < b.index) return -1;
        //     return 0;
        //     console.log(outputs);
        // });

        // // 出力欄を???に戻す
        // output1.innerHTML = "???";
        // output2.innerHTML = "???";
        // output3.innerHTML = "???";
        // output4.innerHTML = "???";
        // output_comment.innerHTML = "";

        // // 再度実行できるようにボタンのactive / disabled化
        // reset_btn.setAttribute("disabled", true);
        // exec_btn.removeAttribute("disabled");

        // // すべてのflagを初期値にリセットする
        // flag_error = false;
        // flag_result = false;
    }

/**************************************************
* エラー出力用の関数・その他
**************************************************/
    // 入力値に空欄が含まれている場合にエラーメッセージを表示し、処理を終了させる。
    function errorCheck_blank(inputs) {
        if(inputs.includes("none")) {
            alert("相手種族に未指定の箇所があります。\nすべての相手種族を指定の上、再度実行してください");
            // flag_error = true;
            location.reload();
        }
    }

    // エラーが発生していなければ、「結果をリセット」ボタンをクリック可能な状態にする。
    function activeResetButton() {
        if(flag_error != true) {
            reset_btn.removeAttribute("disabled");
        }
    }

    // 結果が表示されたら「この種族で決定！」ボタンをdisabledにする。
    function disabledExecButton() {
        if(flag_result == true) {
            exec_btn.setAttribute("disabled", true);
        }
    }
