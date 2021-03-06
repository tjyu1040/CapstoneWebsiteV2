<?php include "base.php"; ?>


<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="dcodes/maps/css/dc_maps.css"/>
    <link type="text/css" rel="stylesheet" href="dcodes/columns/css/dc_columns.css"/>
    <link type="text/css" rel="stylesheet" href="dcodes/contact_forms/css/dc_form_contact_dark.css"/>
    <link type="text/css" rel="stylesheet" href="dcodes/contact_forms/css/dc_form_contact_light.css"/>
    <link type="text/css" rel="stylesheet" href="dcodes/divider/css/dc_divider.css"/>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Neuton">
    <link rel="stylesheet" type="text/css" href="dcodes/social_icons/dc_social_icons.css"/>

    <style>


        label {
            float: left;
            width: 100px;
            text-align: left;

        }

        textarea, input:required, input[required] input:invalid {
            border: 2px solid darkblue;
        }

        textarea {
            height: 15em;
        }

        #submit, #reset {
            margin-left: 12em;
            width: 100px;
            height: 3em;
        }

        #submit:hover {
            font-weight: bold;
            background-color: #bbbbbb;
        }

        #reset:hover {
            font-weight: bold;
            background-color: #bbbbbb;
        }

    </style>


</head>
<body>

<div class="wrapper">

    <?php
    if (!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username'])) {
        // Logged in.
        include "logoutButton.html";
    } else {
        // Not logged in.
        include "loginForm.html";
    }
    include "header.html";
    ?>

    <div class="container">


        <?php

        if (!empty($_POST['email'])) {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $subject = $_POST['subject'];
            $comments = $_POST['message'];
            $headers = "From: " . $email . "\r\n" . "Cc: daniel.heidemeyer@gallaudet.edu, sung.an@gallaudet.edu\r\n";
            if (mail("timothy.yu@gallaudet.edu", $subject, $comments, $headers)) {
                echo "<p style='color:green;'>Email successfully sent! Please wait up to 24 hours for a response.</p>";
            } else {
                echo "<p style='color:red;'>Email not sent. Try again.</p>";
            }
        } else {
            echo '
            <!-- DC Contact Form Start -->
            <!-- DC [Columns: L/Sidebar + Body] Start -->
            <div align="center" ><h2>Contact</h2></div>
            <div class="dc_hrline_black" style="width:99%; "></div>
            <div class="one_third_pad">
                 <form action="contact_us.php" method="post" class="dc_form_contact_light">
                        <label for="name">Name <span>(required)</span></label>
                        <input type="text" name="name" class="form-input" id="name" required />
                        <label for="email">Email <span>(required)</span></label>
                        <input type="email" name="email" class="form-input" id="email" required />
                        <label for="subject">Subject <span>(optional)</span></label>
                        <input type="text" name="subject" class="form-input" id="subject" />
                        <label for="message">Message <span>(required)</span></label>
                        <textarea name="message" class="form-input" id="message" required></textarea>
                        <input class="form-btn" type="submit" value="Send Message" />
                      </form>
            </div>


            <div class="two_third_pad column-last">
                  <h2>Address</h2>
                    <p> Gallaudet University, HMB W353</br>
                        800 Florida Ave NE</br>
                        Washington, DC 20002</p>
                  <div id="googleMap" style="width:550px;height:410px;"></div>
            </div>
            <!-- END two_third_pad -->
            <!-- DC [Columns: L/Sidebar + Body] End -->
            <div class="dc_clear"></div> <!-- line break/clear line -->
             
                  ';
        }
        ?>
    </div>
    <?php include "footer.html"; ?>
</div>
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
<script src="js/dialogForm.js"></script>
<script type="text/javascript" src="dcodes/contact_forms/js/dc_form_contact.js"></script>
<script src="http://maps.googleapis.com/maps/api/js"></script>
<script>
    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(38.9073649, -76.99373249999996),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
</script>


</body>
</html>