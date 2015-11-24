$(document).on('deviceready', function() {
    console.log("INDEX");
    openFB.init({appId: '867006893383189', tokenStore: window.localStorage});
    next();
});

function next(){ 
   setTimeout(openFB.api({
                        path: '/me',
                        success: function(user) {
                            myUrl=  "http://rentme.altervista.org/login.php?"       +
                                    "id="           +   user.id                     +
                                    "&name="        +   user.first_name             +
                                    "&surname="     +   user.last_name              +
                                    "&email="       +   user.email                  +
                                    "&loginType="   +   'Facebook'                  +
                                    "&token="       +   localStorage.fbAccessToken  +
                                    "&picture="     +   String(user.picture.data.url).replace(/&/gi,'%26')      ; 
                            xhttp = new XMLHttpRequest;
                            xhttp.open("GET", myUrl, false);
                            xhttp.send();                    
                            jUser=xhttp.response;                     
                            if(JSON.parse(jUser).id!=null){                                
                                localStorage.setItem("userData",jUser);
                                setTimeout(function(){
                                            window.location.href="new_home.html";
                                },50);                          
                            }else{                                                                 
                                setTimeout(function(){
                                    window.location="startPage.html";
                                },100);    
                            }                        
                        },
                        error: function(data) {                           
                            googleapi.getToken({
                                    client_id: app_google.client_id,
                                    client_secret: app_google.client_secret
                            }).then(function(data) {
                                //Pass the token to the API call and return a new promise object
                                return googleapi.userInfo({ access_token: data.access_token });
                            }).done(function(user) { 
                               myUrl=  "http://rentme.altervista.org/login.php?"       +
                                        "id="           +   user.id                     +
                                        "&name="        +   user.given_name             +
                                        "&surname="     +   user.family_name            +
                                        "&email="       +   user.email                  +
                                        "&loginType="   +   'Google'                    +
                                        "&token="       +   localStorage.access_token   +
                                        "&picture="     +   String(user.picture).replace(/&/gi,'%26')                      ;                                                     
                                xhttp = new XMLHttpRequest;
                                xhttp.open("GET", myUrl, false);
                                xhttp.send();
                                jUser=xhttp.response;
                                if(JSON.parse(jUser).id!=null){
                                    localStorage.setItem("userData",jUser);
                                    setTimeout(function(){
                                                window.location.href="new_home.html";
                                    },50);                          
                                }else{                                                              
                                    setTimeout(function(){
                                        //window.location="login.html";
                                        window.location="startPage.html";
                                    },100);                                      
                                }                             
                            })
                                 
                              .fail(function() {

                                console.log("renteme check login");
                                 myUser= JSON.parse(localStorage.getItem("userData"));
                                console.log(myUser);
                               myUrl=  "http://rentme.altervista.org/login.php?"       +
                                        "id="           +   myUser.id                     +
                                        "&name="        +   myUser.name             +
                                        "&surname="     +   myUser.surname            +
                                        "&email="       +   myUser.email                  +
                                        "&loginType="   +   'rentMe'                    +
                                        "&token="       +   myUser.token   +
                                        "&picture="     +   String(myUser.picture).replace(/&/gi,'%26')      ;
                                xhttp = new XMLHttpRequest;
                                xhttp.open("GET", myUrl, false);
                                xhttp.send();
                                jUser=xhttp.response;
                                console.log("result:");
                                console.log(jUser);
                                if(JSON.parse(jUser).id!=null){
                                    localStorage.setItem("userData",jUser);
                                    setTimeout(function(){
                                                window.location.href="new_home.html";
                                    },50);                          
                                }else{                                                              
                                    setTimeout(function(){
                                        //window.location="login.html";
                                        window.location="startPage.html";
                                    },100); 
                                }
                            });                                           
                        }
                    }),1500);
}