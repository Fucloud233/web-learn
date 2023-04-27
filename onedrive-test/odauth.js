var curAppInfo = null;


// 相当于全局控制函数

function onedriveAuth(click) {
    // 确保使用https连接
    if (window.location.protocol != "https:" && window.location.protoco != "file:" && window.location.hostname != "localhost") {
            window.location.href = "https:" +  window.location.href.substring(window.location.protocol.length)
    }

    var token = getTokenFromCookie();
    // 如果rookie中存在验证的话 
    if (token) {
        authenticated(token);
    }
    // 如果是点击则进行验证
    else if (click) {
        authorize();
    }
    // 如果啥也没有 则显示登陆按钮
    else {
        showLoginButton();
    }
}

function getAppInfo() {
    if(curAppInfo)
        return curAppInfo;
}

function setAppInfo(appInfo) {
    curAppInfo = appInfo;
}

// 用于验证
function authorize() {
    var appInfo = getAppInfo();

    var url = 
        appInfo.authServiceUri +
        "?client_id=" + appInfo.clientId +
        // 启用token_flow 
        // https://stackoverflow.com/questions/25511096/getting-error-unsupported-response-typeerror-description-aadsts70005-with-tok
        "&response_type=token" +
        // 对url中的特殊字符进行编码 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
        "&redirect_uri=" + encodeURIComponent(appInfo.redirectUri)

        if (appInfo.scopes)
            url = url + "&scope=" + encodeURIComponent(appInfo.scopes)

    // 弹出验证窗口进行验证
    popup(url)
}

function popup(url) {
    // 设置弹出界面的基本属性
    var width = 525,
        height = 525,
        screenX = window.screenX,
        screenY = window.screenY,
        outerWidth = window.outerWidth,
        outerHeight = window.outerHeight
    
    var left = screenX + Math.max(outerWidth - width, 0)/2
    var top = screenY + Math.max(outerHeight - height, 0)/2

    var features = [
        "width=" + width,
        "height=" + height,
        "top=" + top,
        "left=" + left,
        "status=no",
        "resizebale=yes",
        "toolbar=no",
        "menubar=no",
        "scrollbars=yes",
    ] 

    var popup = window.open(url, "auth",  features.join(","))
    if(!popup)
        alert("failed to pop up auth window");

    popup.focus();
}

// 用于解析token
function authCallback() {
    var authInfo = getAuthInfoFromUrl()
    //  console.log(authInfo);

    // 从解析出来的json对象提出数据
    var token = authInfo["access_token"]
    var expiry = parseInt(authInfo["expires_in"])

    // 如果存在token 说明认证成功
    if (token) {
        // 保存token
        setCookie(token, expiry);
        window.opener.authenticated(token, window);
    }
}

// 从URL中提取信息
function getAuthInfoFromUrl() {
    // hash是#后面的部分 
    // https://developer.mozilla.org/en-US/docs/Web/API/Location
    if(window.location.hash) {
        var authResponse = window.location.hash.substring(1)
        // 将后缀部分解析成JSON内容
        var authInfo = JSON.parse (
            '{' + authResponse.replace(/([^=]+)=([^&]+)&?/g, '"$1":"$2",').slice(0, -1) + '}');
        // 返回这个对象
        return authInfo
    }
    // 如果没有hash部分 则提示错误
    else {
        alert("failed to receive auth token");
    }
}

// 用于退出验证
function logoutOfAuth() {
    clearCookie();
    showLoginButton();
}

// 在网页中保存cookie
function setCookie(token, expiresInSeconds) {
    var expiration = new Date();
    expiration.setTime(expiration.getTime() + expiresInSeconds * 1000)
    var cookie = "odauth=" + token + "; path=/; expires=" + expiration.toUTCString();

    if(document.location.protocol.toLocaleLowerCase == "https") {
        cookie = cookie + "; sercue"
    }

    document.cookie = cookie;
}

// 在网页中删除cookie
function clearCookie() {
    var expiration = new Date();
    var cookie = "odauth=; path=/; expires=" + expiration.toUTCString();
    document.cookie = cookie;
}

// 从cookie中得到token
function getTokenFromCookie() {
    var cookies = document.cookie;
    var name = "odauth=";
    
    // 记录开始下标
    var start = cookies.indexOf(name);

    // 判断是否存在odauth=
    if (start < 0) {
        return ""
    }
    
    start += name.length;
    // 记录结束下标
    var end = cookies.indexOf(';', start);

    if(end < 0) {
        end = cookies.length
    }
    
    var value = cookies.substring(start, end);
    return value;
}

function showLoginButton() {
    if (typeof showCustomLoginButton === "function") {
        showCustomLoginButton(true);
        return;
      }

    var loginText = document.createElement('a')
    loginText.text = "#";
    loginText.id = "loginText";
    loginText.onclick = authorize;
    loginText.innerText = loginText.textContent = "[sign in]";

    document.body.insertBefore(loginText, document.body.children[0])
}

function removeLoginButton() {
    if (typeof showCustomLoginButton === "function") {
        showCustomLoginButton(false);
        return;
      }

    var loginText = document.getElementById("loginText");
    if (loginText) {
      document.body.removeChild(loginText);
    }
}
