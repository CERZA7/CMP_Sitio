		<?php
				$mail = strip_tags($_POST['mail']);
				$checkRobot = strip_tags($_POST['checkRobot']);

				// Text to send
				$texte = "Hi there,<br /><br />";
				$texte = $texte . "Suscripción desde Compañía de Profetas.<br />";
				$texte = $texte . "The elements entered in the form are as follows :<br />";
				$texte = $texte . "Email :  $mail<br /><br />";
				$texte = $texte . "This is an automatic message, do not reply to it.";

				$texte = stripslashes($texte);

				/// Recipient and subject of the message
				$destinataire = "contacto@companiaprofetas.com"; // CAMBIAR: tu email real aquí
				$objet = "Nueva suscripción desde Compañía de Profetas";

				//Headers
	      $headers = array(
	                      'Content-type' => 'text/html',
	                      'From' => 'noreply@companiaprofetas.com', // CAMBIAR: tu dominio real
	                      'X-Mailer' => 'PHP/' . phpversion()
	                  );

				// Send the message then return data to current page with ajax
				if ($checkRobot == 7) {
					$sending_ok = mail($destinataire, $objet, $texte, $headers);
					if ($sending_ok) {
							echo "<p class=\"hardLight\">Thank you for your registration !</p>";
						}
					else {
							echo "<p class=\"hardLight\">There seems to be a problem ...</p>";
						}

				} else {
					echo "<p class=\"hardLight\">There seems to be a problem with the anti robot control ...</p>";
				}
