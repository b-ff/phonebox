// Biryukov Vyacheslav (NetWorm)
// PhoneBox jQuery plugin
// 12.07.2012

(function($){

	jQuery.fn.phonebox = function(options){

		options = $.extend({

			showLocation : true,
                        forceSeven: false,

    	}, options);

		this.addClass("phonebox");

		this.bind('blur', function() {

			$("div#phonebox_location").fadeOut(400,function() {
	
				$(this).remove();
	
			});	

		});

		this.bind('keyup', function() {

    	
			if ($(this).is(":focus")) {
    			
    			var is_mobile = false;

				var string = remove_symbols($(this).val());

				if (string == '') {

					$("div#phonebox_location").fadeOut(400,function() {
			
						$(this).remove();
			
					});
						
				}

				$(this).val(check_mobile_codes($(this).val()));

				if ($(this).val().search(/\+?\d\(9[0-9]{2}\)/) != -1) { is_mobile = true; }

				$(this).val(check_city_codes($(this).val()));

				if (!options.showLocation) { $("div#phonebox_location").remove(); }

				// Insert "-"

				var codelessPhone = remove_symbols($(this).val().replace(/\+?\d\([0-9]{3,5}\)/, ''));

				if (codelessPhone.length > 2 && codelessPhone.length < 5 && !is_mobile) { // Insert "-" after first two digits 
					
					if (codelessPhone.search(/\-/) == -1) {

						var extraCodeless = codelessPhone.replace(/([0-9]{2})([0-9]{1,})/,"$1\-$2");
						$(this).val($(this).val().replace(codelessPhone,extraCodeless));

					}
					
				}

				if (codelessPhone.length > 3 && codelessPhone.length < 6 && is_mobile) { // Insert "-" for mobile, step 1
					
					if (codelessPhone.search(/\-/) == -1) {

						var extraCodeless = codelessPhone.replace(/([0-9]{3})([0-9]{1,})/,"$1\-$2");
						$(this).val($(this).val().replace(codelessPhone,extraCodeless));

					}
					
				}				

				codelessPhone = $(this).val().replace(/\+?\d\([0-9]{3,5}\)/, '');

				if (remove_symbols(codelessPhone).length > 4 && remove_symbols(codelessPhone).length < 7 && !is_mobile) { // Insert "-" after second two digits 

					var extraCodeless = codelessPhone.replace(/([0-9]{2})\-?([0-9]{2})([0-9]{1,})/,"$1\-$2\-$3");
					$(this).val($(this).val().replace(codelessPhone,extraCodeless));
					
				}

				if (remove_symbols(codelessPhone).length > 5 && remove_symbols(codelessPhone).length < 8 && is_mobile) { // Insert "-" for mobile, step 2

					var extraCodeless = codelessPhone.replace(/([0-9]{3})\-?([0-9]{2})([0-9]{1,})/,"$1\-$2\-$3");
					$(this).val($(this).val().replace(codelessPhone,extraCodeless));
					
				}				

				if (remove_symbols(codelessPhone).length > 6) { // Insert "-" in seven-digits number

					var extraCodeless = codelessPhone.replace(/\D/g, '').replace(/([0-9]{3})([0-9]{2})([0-9]{2})/,"$1\-$2\-$3");
					$(this).val($(this).val().replace(codelessPhone,extraCodeless));
					
				}				

                                if(options.forceSeven) { $(this).val($(this).val().replace(/^8/, '+7')); }

			}

		});

	}

	function remove_symbols(string) {

		string = string.replace(/\D/g, '');

		return string;

	}

	function check_city_codes(string) {

		var cityCodes = [];

		cityCodes[0]				= ["АДЫГЕЯ",							"МАЙКОП",							87722];
		cityCodes[cityCodes.length] = ["АДЫГЕЯ",							"МАЙКОП",							8772];
		cityCodes[cityCodes.length] = ["АЛТАЙСКАЯ РЕСПУБЛИКА",				"ГОРНО-АЛТАЙСК",					38822];
		cityCodes[cityCodes.length] = ["АЛТАЙСКИЙ КРАЙ",					"БАРНАУЛ",							3852];
		cityCodes[cityCodes.length] = ["АМУРСКИЙ КРАЙ",						"БЛАГОВЕЩЕНСК",						4162];
		cityCodes[cityCodes.length] = ["АРХАНГЕЛЬСКАЯ ОБЛАСТЬ",				"АРХАНГЕЛЬСК",						818];
		cityCodes[cityCodes.length] = ["АСТРАХАНСКАЯ ОБЛАСТЬ",				"АСТРАХАНЬ",						8512];
		cityCodes[cityCodes.length] = ["БАШКОРТОСТАН",						"УФА",								3472];
		cityCodes[cityCodes.length] = ["БЕЛГОРОДСКАЯ ОБЛАСТЬ",				"БЕЛГОРОД",							4722];
		cityCodes[cityCodes.length] = ["БРЯНСКАЯ ОБЛАСТЬ",					"БРЯНСК",							4832];
		cityCodes[cityCodes.length] = ["БУРЯТИЯ",							"УЛАН-УДЭ",							3012];
		cityCodes[cityCodes.length] = ["ВЛАДИМИРСКАЯ ОБЛАСТЬ",				"ВЛАДИМИР",							4922];
		cityCodes[cityCodes.length] = ["ВОЛГОГРАДСКАЯ ОБЛАСТЬ",				"ВОЛГОГРАД",						8442];
		cityCodes[cityCodes.length] = ["ВОЛОГОДСКАЯ ОБЛАСТЬ",				"ВОЛОГДА",							8172];
		cityCodes[cityCodes.length] = ["ВОРОНЕЖСКАЯ ОБЛАСТЬ",				"ВОРОНЕЖ",							4732];
		cityCodes[cityCodes.length] = ["ДАГЕСТАН",							"МАХАЧКАЛА",						8722];
		cityCodes[cityCodes.length] = ["ЕВРЕЙСКАЯ ОБЛАСТЬ",					"БИРОБИДЖАН",						42622];
		cityCodes[cityCodes.length] = ["ЗАБАЙКАЛЬСКИЙ КРАЙ",				"ЧИТА",								3022];
		cityCodes[cityCodes.length] = ["ИВАНОВСКАЯ ОБЛАСТЬ",				"ИВАНОВО",							493];	
		cityCodes[cityCodes.length] = ["ИНГУШЕТИЯ",							"НАЗРАНЬ",							8732];
		cityCodes[cityCodes.length] = ["ИРКУТСКАЯ ОБЛАСТЬ",					"ИРКУТСК",							3952];
		cityCodes[cityCodes.length] = ["КАБАРДИНО-БАЛКАРИЯ",				"НАЛЬЧИК",							8662];
		cityCodes[cityCodes.length] = ["КАЛИНИНГРАДСКАЯ ОБЛАСТЬ",			"КАЛИНИНГРАД",						4012];
		cityCodes[cityCodes.length] = ["КАЛМЫКИЯ",							"ЭЛИСТА",							84722];
		cityCodes[cityCodes.length] = ["КАЛУЖСКАЯ ОБЛАСТЬ",					"КАЛУГА",							4842];
		cityCodes[cityCodes.length] = ["КАМЧАТКА",							"ПЕТРОПАВЛОВСК-КАМЧАТСКИЙ",			41522];
		cityCodes[cityCodes.length] = ["КАМЧАТКА",							"ПЕТРОПАВЛОВСК-КАМЧАТСКИЙ",			4152];
		cityCodes[cityCodes.length] = ["КАРАЧАЕВО-ЧЕРКЕСИЯ",				"ЧЕРКЕССК",							87822];
		cityCodes[cityCodes.length] = ["КАРАЧАЕВО-ЧЕРКЕСИЯ",				"ЧЕРКЕССК",							8782];
		cityCodes[cityCodes.length] = ["КАРЕЛИЯ",							"ПЕТРОЗАВОДСК",						8142];
		cityCodes[cityCodes.length] = ["КЕМЕРОВСКАЯ ОБЛАСТЬ",				"КЕМЕРОВО",							3842];
		cityCodes[cityCodes.length] = ["КИРОВСКАЯ ОБЛАСТЬ",					"КИРОВ",							8332];
		cityCodes[cityCodes.length] = ["КОМИ",								"СЫКТЫВКАР",						8212];
		cityCodes[cityCodes.length] = ["КОСТРОМСКАЯ ОБЛАСТЬ",				"КОСТРОМА",							4942];
		cityCodes[cityCodes.length] = ["КРАСНОДАРСКИЙ КРАЙ",				"КРАСНОДАР",						861];	
		cityCodes[cityCodes.length] = ["КРАСНОЯРСКИЙ КРАЙ",					"КРАСНОЯРСК",						3912];
		cityCodes[cityCodes.length] = ["КУРГАНСКАЯ ОБЛАСТЬ",				"КУРГАН",							3522];
		cityCodes[cityCodes.length] = ["КУРСКАЯ ОБЛАСТЬ",					"КУРСК",							47122];
		cityCodes[cityCodes.length] = ["КУРСКАЯ ОБЛАСТЬ",					"КУРСК",							4712];
		cityCodes[cityCodes.length] = ["ЛЕНИНГРАДСКАЯ ОБЛАСТЬ",				"САНКТ-ПЕТЕРБУРГ",					812];	
		cityCodes[cityCodes.length] = ["ЛИПЕЦКАЯ ОБЛАСТЬ",					"ЛИПЕЦК",							4742];
		cityCodes[cityCodes.length] = ["МАГАДАНСКАЯ ОБЛАСТЬ",				"МАГАДАН",							41322];
		cityCodes[cityCodes.length] = ["МАРИЙ-ЭЛ",							"ЙОШКАР-ОЛА",						8362];
		cityCodes[cityCodes.length] = ["МОРДОВИЯ",							"САРАНСК",							8342];
		cityCodes[cityCodes.length] = ["МОСКОВСКАЯ ОБЛАСТЬ",				"МОСКВА",							495];
		cityCodes[cityCodes.length] = ["МОСКОВСКАЯ ОБЛАСТЬ",				"МОСКВА",							499];
		cityCodes[cityCodes.length] = ["МУРМАНСКАЯ ОБЛАСТЬ",				"МУРМАНСК",							8152];
		cityCodes[cityCodes.length] = ["НИЖЕГОРОДСКАЯ ОБЛАСТЬ",				"НИЖНИЙ НОВГОРОД",					8312];
		cityCodes[cityCodes.length] = ["НОВГОРОДСКАЯ ОБЛАСТЬ",				"ВЕЛИКИЙ НОВГОРОД",					8162];
		cityCodes[cityCodes.length] = ["НОВГОРОДСКАЯ ОБЛАСТЬ",				"ВЕЛИКИЙ НОВГОРОД",					81622];
		cityCodes[cityCodes.length] = ["НОВОСИБИРСКАЯ ОБЛАСТЬ",				"НОВОСИБИРСК",						383];
		cityCodes[cityCodes.length] = ["ОМСКАЯ ОБЛАСТЬ",					"ОМСК",								3812];
		cityCodes[cityCodes.length] = ["ОРЕНБУРГСКАЯ ОБЛАСТЬ",				"ОРЕНБУРГ",							3532];
		cityCodes[cityCodes.length] = ["ОРЛОВСКАЯ ОБЛАСТЬ",					"ОРЕЛ",								4862];
		cityCodes[cityCodes.length] = ["ОРЛОВСКАЯ ОБЛАСТЬ",					"ОРЕЛ",								48622];
		cityCodes[cityCodes.length] = ["ПЕНЗЕНСКАЯ ОБЛАСТЬ",				"ПЕНЗА",							8412];
		cityCodes[cityCodes.length] = ["ПЕРМСКАЯ ОБЛАСТЬ",					"ПЕРМЬ",							3422];
		cityCodes[cityCodes.length] = ["ПРИМОРСКИЙ КРАЙ",					"ВЛАДИВОСТОК",						423];
		cityCodes[cityCodes.length] = ["ПСКОВСКАЯ ОБЛАСТЬ",					"ПСКОВ",							81122];
		cityCodes[cityCodes.length] = ["ПСКОВСКАЯ ОБЛАСТЬ",					"ПСКОВ",							8112];
		cityCodes[cityCodes.length] = ["РОСТОВСКАЯ ОБЛАСТЬ",				"РОСТОВ-НА-ДОНУ",					863];
		cityCodes[cityCodes.length] = ["РЯЗАНСКАЯ ОБЛАСТЬ",					"РЯЗАНЬ",							4912];
		cityCodes[cityCodes.length] = ["САМАРСКАЯ ОБЛАСТЬ",					"САМАРА",							846];
		cityCodes[cityCodes.length] = ["САРАТОВСКАЯ ОБЛАСТЬ",				"САРАТОВ",							8452];
		cityCodes[cityCodes.length] = ["САХАЛИН",							"ЮЖНО-САХАЛИНСК",					42422];
		cityCodes[cityCodes.length] = ["САХАЛИН",							"ЮЖНО-САХАЛИНСК",					4242];
		cityCodes[cityCodes.length] = ["СВЕРДЛОВСКАЯ ОБЛАСТЬ",				"ЕКАТЕРИНБУРГ",						343];	
		cityCodes[cityCodes.length] = ["СЕВЕРНАЯ ОСЕТИЯ",					"ВЛАДИКАВКАЗ",						8672];
		cityCodes[cityCodes.length] = ["СМОЛЕНСКАЯ ОБЛАСТЬ",				"СМОЛЕНСК",							4812];
		cityCodes[cityCodes.length] = ["СТАВРОПОЛЬСКИЙ КРАЙ",				"СТАВРОПОЛЬ",						8652];
		cityCodes[cityCodes.length] = ["ТАМБОВСКАЯ ОБЛАСТЬ",				"ТАМБОВ",							4752];
		cityCodes[cityCodes.length] = ["ТАТАРСТАН",							"КАЗАНЬ",							8432];
		cityCodes[cityCodes.length] = ["ТВЕРСКАЯ ОБЛАСТЬ",					"ТВЕРЬ",							4822];
		cityCodes[cityCodes.length] = ["ТВЕРСКАЯ ОБЛАСТЬ",					"ТВЕРЬ",							48222];
		cityCodes[cityCodes.length] = ["ТОМСКАЯ ОБЛАСТЬ",					"ТОМСК",							3822];
		cityCodes[cityCodes.length] = ["ТУВА",								"КЫЗЫЛ",							39422];
		cityCodes[cityCodes.length] = ["ТУЛЬСКАЯ ОБЛАСТЬ",					"ТУЛА",								4872];
		cityCodes[cityCodes.length] = ["ТЮМЕНСКАЯ ОБЛАСТЬ",					"ТЮМЕНЬ",							3452];
		cityCodes[cityCodes.length] = ["УДМУРТИЯ",							"ИЖЕВСК",							3412];
		cityCodes[cityCodes.length] = ["УЛЬЯНОВСКАЯ ОБЛАСТЬ",				"УЛЬЯНОВСК",						8422];
		cityCodes[cityCodes.length] = ["ХАБАРОВСКИЙ КРАЙ",					"ХАБАРОВСК",						4212];
		cityCodes[cityCodes.length] = ["ХАКАСИЯ",							"АБАКАН",							39022];
		cityCodes[cityCodes.length] = ["ЧЕЛЯБИНСКАЯ ОБЛАСТЬ",				"ЧЕЛЯБИНСК",						3512];
		cityCodes[cityCodes.length] = ["ЧЕЧЕНСКАЯ РЕСПУБЛИКА",				"ГРОЗНЫЙ",							8712];
		cityCodes[cityCodes.length] = ["ЧУВАШИЯ",							"ЧЕБОКСАРЫ",						8352];
		cityCodes[cityCodes.length] = ["ЧУКОТКА",							"АНАДЫРЬ",							42722];
		cityCodes[cityCodes.length] = ["ЯКУТСКАЯ САХА",						"ЯКУТСК",							4112];
		cityCodes[cityCodes.length] = ["ЯМАЛО-НЕНЕЦКИЙ ОКРУГ",				"САЛЕХАРД",							34922];
		cityCodes[cityCodes.length] = ["ЯРОСЛАВСКАЯ ОБЛАСТЬ",				"ЯРОСЛАВЛЬ",						4852];

		if (/\([0-9]{3,5}/.exec(string) == null ) { // If we don't have marked city code in string

			for(var i=0; i<cityCodes.length; i++) { // For every city code

				var city = cityCodes[i];

				if (remove_symbols(string).search(city[2]) <= 1 && remove_symbols(string).search(city[2]) > 0) { // If code exists in the first part of number

					if (string.search(/\+/) == 0) { string = "+"+remove_symbols(string); } else { string = remove_symbols(string); } // Remove all symbols from string but save "+"

					string = string.replace(city[2], '('+city[2]+')'); // Wrap city code to ()

					$("div#phonebox_location").fadeOut(400,function() {
	
						$(this).remove();
	
					});					

					$("body").prepend('<div id="phonebox_location">'+city[0]+', '+city[1]+'</div>');

					$("#phonebox_location").css({

						'position'	: 'absolute',
						'top'		: $(".phonebox").offset().top+parseInt($(".phonebox").css('height').replace(/\D/g,''),10),
						'left'		: $(".phonebox").offset().left,
						'background': '#EEEEEE',
						'color'		: 'gray',
						'border'	: '1px solid silver',
						'width'		: '250px',
						'heigth'	: '30px',
						'padding'	: '10px',
						'marginTop'	: '5px',
						'marginLeft': '1px',
						'fontSize'	: '11px',
						'textAlign'	: 'center'

					});

				}


			}

		}

		return string;

	}

	function check_mobile_codes(string) {

		var mobileCode = [];

			mobileCode[0] = 900;
			mobileCode[mobileCode.length] = 901;
			mobileCode[mobileCode.length] = 902;
			mobileCode[mobileCode.length] = 903;
			mobileCode[mobileCode.length] = 904;
			mobileCode[mobileCode.length] = 905;
			mobileCode[mobileCode.length] = 906;
			mobileCode[mobileCode.length] = 908;
			mobileCode[mobileCode.length] = 909;
			mobileCode[mobileCode.length] = 910;
			mobileCode[mobileCode.length] = 911;
			mobileCode[mobileCode.length] = 912;
			mobileCode[mobileCode.length] = 913;
			mobileCode[mobileCode.length] = 914;
			mobileCode[mobileCode.length] = 915;
			mobileCode[mobileCode.length] = 916;
			mobileCode[mobileCode.length] = 917;
			mobileCode[mobileCode.length] = 918;
			mobileCode[mobileCode.length] = 919;
			mobileCode[mobileCode.length] = 920;
			mobileCode[mobileCode.length] = 921;
			mobileCode[mobileCode.length] = 922;
			mobileCode[mobileCode.length] = 923;
			mobileCode[mobileCode.length] = 924;
			mobileCode[mobileCode.length] = 925;
			mobileCode[mobileCode.length] = 926;
			mobileCode[mobileCode.length] = 927;
			mobileCode[mobileCode.length] = 928;
			mobileCode[mobileCode.length] = 929;
			mobileCode[mobileCode.length] = 930;
			mobileCode[mobileCode.length] = 931;
			mobileCode[mobileCode.length] = 932;
			mobileCode[mobileCode.length] = 933;
			mobileCode[mobileCode.length] = 934;
			mobileCode[mobileCode.length] = 936;
			mobileCode[mobileCode.length] = 937;
			mobileCode[mobileCode.length] = 938;
			mobileCode[mobileCode.length] = 939;
			mobileCode[mobileCode.length] = 941;
			mobileCode[mobileCode.length] = 950;
			mobileCode[mobileCode.length] = 951;
			mobileCode[mobileCode.length] = 952;
			mobileCode[mobileCode.length] = 953;
			mobileCode[mobileCode.length] = 954;
			mobileCode[mobileCode.length] = 955;
			mobileCode[mobileCode.length] = 956;
			mobileCode[mobileCode.length] = 958;
			mobileCode[mobileCode.length] = 960;
			mobileCode[mobileCode.length] = 961;
			mobileCode[mobileCode.length] = 962;
			mobileCode[mobileCode.length] = 963;
			mobileCode[mobileCode.length] = 964;
			mobileCode[mobileCode.length] = 965;
			mobileCode[mobileCode.length] = 966;
			mobileCode[mobileCode.length] = 967;
			mobileCode[mobileCode.length] = 968;
			mobileCode[mobileCode.length] = 970;
			mobileCode[mobileCode.length] = 971;
			mobileCode[mobileCode.length] = 980;
			mobileCode[mobileCode.length] = 981;
			mobileCode[mobileCode.length] = 982;
			mobileCode[mobileCode.length] = 983;
			mobileCode[mobileCode.length] = 984;
			mobileCode[mobileCode.length] = 985;
			mobileCode[mobileCode.length] = 987;
			mobileCode[mobileCode.length] = 988;
			mobileCode[mobileCode.length] = 989;
			mobileCode[mobileCode.length] = 992;
			mobileCode[mobileCode.length] = 993;
			mobileCode[mobileCode.length] = 994;
			mobileCode[mobileCode.length] = 995;
			mobileCode[mobileCode.length] = 996;
			mobileCode[mobileCode.length] = 997;
			mobileCode[mobileCode.length] = 999;

		if (/\([0-9]{3,5}/.exec(string) == null ) { // If we don't have marked city code in string

			for(var i=0; i<mobileCode.length; i++) { // For every city code

				if (remove_symbols(string).search(mobileCode[i]) <= 1 && remove_symbols(string).search(mobileCode[i]) > 0) { // If code exists in the first part of number

					is_mobile = true;

					if (string.search(/\+/) == 0) { string = "+"+remove_symbols(string); } else { string = remove_symbols(string); } // Remove all symbols from string but save "+"

					string = string.replace(mobileCode[i], '('+mobileCode[i]+')'); // Wrap city code to ()

				}


			}

		}

		return string;

	}	

})(jQuery);