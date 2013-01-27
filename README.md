phonebox
========


[ENG]

jQuery plugin which provides auto-formatting of Russian phone numbers in text fields

To install plug-in:

 - Add jQuery library into head section of your document. As example:

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

 - Upload script to your project folder, or use direct link from GitHub to include script 
   into head section of your document:

		<script src="jquery.phonebox.js"></script>

 - To initialize plug-in for a certain text field add this code into any place of your document:

  		jQuery(document).ready(function() {
				jQuery("input#phonebox").phonebox({ showLocation: true });
			});

      if "showLocation" parameter is set as true, the plug-in will show a window with the name of the city 
      determined by a code of the city in phone near a text field



[RUS]

jQuery плагин, позволяющий автоматически форматировать вводимый телефонный номер в текстовое поле

Для установки плагина необходимо:

 - Добавьте в секцию head вашего документа скрипт библиотеки jQuery если вы не используете её в своём проекте.
   Пример:

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

 - Загрузите скрипт плагина в папку для скриптов вашего проекта или используйте прямую ссылку на файл из GitHub чтобы
   добавить скрипт плагина в секцию head вашего документа. Пример:

  	<script src="jquery.phonebox.js"></script>

 - Чтобы вызвать плагин для работы с определённым текстовым полем добавьте следующий код в любое место 
   вашего документа:

  		jQuery(document).ready(function() {
				jQuery("input#phonebox").phonebox({ showLocation: true });
			});

      Если параметр "showLocation" задан как true, плагин будет показывать под текстовым полем окно с названием
      города, определённым по коду города в введённом телефонном номере.
