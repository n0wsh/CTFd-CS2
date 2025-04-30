# Run on development mode
python3.11 -m venv env
source env/bin/activate
python3.11 -m pip install -r requirements.txt
cd CTFd
python3.11 -m flask run

# Theme development
cd CTFd-CS2/CTFd/themes/CTFd-CS2-Theme/
yarn install
yarn dev

Light mode BG: #D9D9D9
Dark mode BG: #2C2D35

index.html
```html
<style>
    .banner {
        display: flex;
      	margin-top: 30px;
        flex-direction: row;
        height: calc(100vh - 3.5rem - 200px);
      	font-size: 22px;
    }
  	.index-title {
      	margin-bottom: 10px;
  		font-family: "High Speed", sans-serif;	
  	}
    @media (max-width: 768px) {
        .banner {
            flex-direction: column-reverse;
            height: auto;
        }
    }
  	.register-btn {
        width: 80%;
        align-self: left;
      	border-radius: 2px;
      	background-color: #36b752;
      	border-color: #36b752;
      	color: #133c08;
      	transition: color 0.3s, text-shadow 0.3s;
      	font-size: 36px;
      	font-weight: bold;
      	padding-top: 2px;
      	padding-bottom: 2px;
    }
  	.register-btn:hover {
  		background-color: #36b752;
      	border-color: #36b752;
      	color: #fff;
      	text-shadow: 0 0 5px #fff;
  	}
    @media (max-width: 768px) {
        .register-btn {
            max-width: 100%;
            width: 100%;
        }
    }
    .logos {
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 30px;
    }
    .logos > img {
        max-height: 48px;
    }
    .logo {
        max-width: 100%;
        height: auto;
    }
  	.nest-logo {
        max-height: 55px !important;
      	margin-left: -10px !important;
    }
    .social-links {
        display: flex;
        gap: 20px;
        margin-bottom: 15px;
    }
    .social-links a {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .social-links img {
        height: 16px;
        width: 16px;
    }
    .sponsor-section {
        margin-top: 10px;
    }
</style>

<script>
    var countDownDate = new Date("{{ ctf_start }}").getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
      }
    }, 1000);
</script>

<div class="banner">
    <div class="d-flex flex-column justify-content-center gap-2" style="flex: 1">
        <h3 class="index-title">
            HARUUL ZANGI U18 - 2025<br>FINAL
        </h3>
        <div class="social-links">
            <a href="https://www.facebook.com/haruulzangiCTF"><i class="fab fa-facebook" aria-hidden="true"></i> Facebook</a>
            <a href="https://github.com/haruulzangi"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
          	<a href="https://ctftime.org/ctf/985"><img src="/files/e23f47a6015b312b727531eabf38d67f/ctftime-fa.png" alt="CTFtime"/> CTFtime</a>
        </div>
        <p>Contest starts in <span id="countdown"></span><br> Registrations are now open</p>
        <a id="btn-reg" href="/register" class="btn btn-primary btn-lg register-btn" role="button">REGISTER</a>
        <div class="sponsor-section">
            <p>Main Sponsor:</p>
            <div class="logos">
                <img href="https://golomtbank.com" src="/files/96ce1296a4fb6835254b0533756ec02c/Golomt_Bank_logo_PNG-ENG-hevtee.png" />
            </div>
        </div>
        <div class="sponsor-section">
            <p>In-Kind Sponsors:</p>
            <div class="logos">
                <img href="https://ssystems.mn" src="/files/96291298e10e8fa2232e381954fe1141/ssystems-black-logo.png" />
                <img href="https://pentesterlab.com" src="/files/13ff6c5a3bf7181d35427426026de484/pentesterlab-logo.png" />
                <img class="nest-logo" href="https://nhs.edu.mn" src="/files/c09b98239a27fe9b25ffda0251a45d13/nest-sponsor-logo.png" />
            </div>
        </div>
    </div>
    <div style="flex:1; align-self:center; padding-left: 30px; padding-right: 30px">
        <img class="mx-auto logo" src="/files/d399378fcf2e993317829e2558a2a2ad/logo-u18-stroke.png" />
    </div>
</div>
<div>
  <div class="col-md-6 offset-md-3" style="margin-top: 10px;">
    <h6 class="text-center">
      <p style="font-family: High Speed; font-size: 14px">Join Discord Server</p>
      <a href="https://discord.gg/WV5uyBSH6t"><img class="w-100 mx-auto d-block" style="max-width: 150px" src="/files/364e94097efb643b5f4381ccd489a847/Discord-Logo-Blurple.png" /></a>
    </h6>
  </div>
</div>
```
