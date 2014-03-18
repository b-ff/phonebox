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
    			var is_global = $(this).val().match(/^(\+7|8).*$/) != null;

				var string = remove_symbols($(this).val());

				if (string == '') {

					$("div#phonebox_location").fadeOut(400,function() {
			
						$(this).remove();
			
					});
						
				}

				if (is_global) { $(this).val(check_mobile_codes($(this).val())); }

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

		var cityCodes = [

			["АДЫГЕЯ",							"МАЙКОП",							87722],
			["АДЫГЕЯ",							"МАЙКОП",							8772],
			["АЛТАЙСКАЯ РЕСПУБЛИКА",				"ГОРНО-АЛТАЙСК",					38822],
			["АЛТАЙСКИЙ КРАЙ",					"БАРНАУЛ",							3852],
			["АМУРСКИЙ КРАЙ",						"БЛАГОВЕЩЕНСК",						4162],
			["АРХАНГЕЛЬСКАЯ ОБЛАСТЬ",				"АРХАНГЕЛЬСК",						818],
			["АСТРАХАНСКАЯ ОБЛАСТЬ",				"АСТРАХАНЬ",						8512],
			["БАШКОРТОСТАН",						"УФА",								3472],
			["БЕЛГОРОДСКАЯ ОБЛАСТЬ",				"БЕЛГОРОД",							4722],
			["БРЯНСКАЯ ОБЛАСТЬ",					"БРЯНСК",							4832],
			["БУРЯТИЯ",							"УЛАН-УДЭ",							3012],
			["ВЛАДИМИРСКАЯ ОБЛАСТЬ",				"ВЛАДИМИР",							4922],
			["ВОЛГОГРАДСКАЯ ОБЛАСТЬ",				"ВОЛГОГРАД",						8442],
			["ВОЛОГОДСКАЯ ОБЛАСТЬ",				"ВОЛОГДА",							8172],
			["ВОРОНЕЖСКАЯ ОБЛАСТЬ",				"ВОРОНЕЖ",							4732],
			["ДАГЕСТАН",							"МАХАЧКАЛА",						8722],
			["ЕВРЕЙСКАЯ ОБЛАСТЬ",					"БИРОБИДЖАН",						42622],
			["ЗАБАЙКАЛЬСКИЙ КРАЙ",				"ЧИТА",								3022],
			["ИВАНОВСКАЯ ОБЛАСТЬ",				"ИВАНОВО",							493],
			["ИНГУШЕТИЯ",							"НАЗРАНЬ",							8732],
			["ИРКУТСКАЯ ОБЛАСТЬ",					"ИРКУТСК",							3952],
			["КАБАРДИНО-БАЛКАРИЯ",				"НАЛЬЧИК",							8662],
			["КАЛИНИНГРАДСКАЯ ОБЛАСТЬ",			"КАЛИНИНГРАД",						4012],
			["КАЛМЫКИЯ",							"ЭЛИСТА",							84722],
			["КАЛУЖСКАЯ ОБЛАСТЬ",					"КАЛУГА",							4842],
			["КАМЧАТКА",							"ПЕТРОПАВЛОВСК-КАМЧАТСКИЙ",			41522],
			["КАМЧАТКА",							"ПЕТРОПАВЛОВСК-КАМЧАТСКИЙ",			4152],
			["КАРАЧАЕВО-ЧЕРКЕСИЯ",				"ЧЕРКЕССК",							87822],
			["КАРАЧАЕВО-ЧЕРКЕСИЯ",				"ЧЕРКЕССК",							8782],
			["КАРЕЛИЯ",							"ПЕТРОЗАВОДСК",						8142],
			["КЕМЕРОВСКАЯ ОБЛАСТЬ",				"КЕМЕРОВО",							3842],
			["КИРОВСКАЯ ОБЛАСТЬ",					"КИРОВ",							8332],
			["КОМИ",								"СЫКТЫВКАР",						8212],
			["КОСТРОМСКАЯ ОБЛАСТЬ",				"КОСТРОМА",							4942],
			["КРАСНОДАРСКИЙ КРАЙ",				"КРАСНОДАР",						861],
			["КРАСНОЯРСКИЙ КРАЙ",					"КРАСНОЯРСК",						3912],
			["КУРГАНСКАЯ ОБЛАСТЬ",				"КУРГАН",							3522],
			["КУРСКАЯ ОБЛАСТЬ",					"КУРСК",							47122],
			["КУРСКАЯ ОБЛАСТЬ",					"КУРСК",							4712],
			["ЛЕНИНГРАДСКАЯ ОБЛАСТЬ",				"САНКТ-ПЕТЕРБУРГ",					812],
			["ЛИПЕЦКАЯ ОБЛАСТЬ",					"ЛИПЕЦК",							4742],
			["МАГАДАНСКАЯ ОБЛАСТЬ",				"МАГАДАН",							41322],
			["МАРИЙ-ЭЛ",							"ЙОШКАР-ОЛА",						8362],
			["МОРДОВИЯ",							"САРАНСК",							8342],
			["МОСКОВСКАЯ ОБЛАСТЬ",				"МОСКВА",							495],
			["МОСКОВСКАЯ ОБЛАСТЬ",				"МОСКВА",							499],
			["МУРМАНСКАЯ ОБЛАСТЬ",				"МУРМАНСК",							8152],
			["НИЖЕГОРОДСКАЯ ОБЛАСТЬ",				"НИЖНИЙ НОВГОРОД",					8312],
			["НОВГОРОДСКАЯ ОБЛАСТЬ",				"ВЕЛИКИЙ НОВГОРОД",					8162],
			["НОВГОРОДСКАЯ ОБЛАСТЬ",				"ВЕЛИКИЙ НОВГОРОД",					81622],
			["НОВОСИБИРСКАЯ ОБЛАСТЬ",				"НОВОСИБИРСК",						383],
			["ОМСКАЯ ОБЛАСТЬ",					"ОМСК",								3812],
			["ОРЕНБУРГСКАЯ ОБЛАСТЬ",				"ОРЕНБУРГ",							3532],
			["ОРЛОВСКАЯ ОБЛАСТЬ",					"ОРЕЛ",								4862],
			["ОРЛОВСКАЯ ОБЛАСТЬ",					"ОРЕЛ",								48622],
			["ПЕНЗЕНСКАЯ ОБЛАСТЬ",				"ПЕНЗА",							8412],
			["ПЕРМСКАЯ ОБЛАСТЬ",					"ПЕРМЬ",							3422],
			["ПРИМОРСКИЙ КРАЙ",					"ВЛАДИВОСТОК",						423],
			["ПСКОВСКАЯ ОБЛАСТЬ",					"ПСКОВ",							81122],
			["ПСКОВСКАЯ ОБЛАСТЬ",					"ПСКОВ",							8112],
			["РОСТОВСКАЯ ОБЛАСТЬ",				"РОСТОВ-НА-ДОНУ",					863],
			["РЯЗАНСКАЯ ОБЛАСТЬ",					"РЯЗАНЬ",							4912],
			["САМАРСКАЯ ОБЛАСТЬ",					"САМАРА",							846],
			["САРАТОВСКАЯ ОБЛАСТЬ",				"САРАТОВ",							8452],
			["САХАЛИН",							"ЮЖНО-САХАЛИНСК",					42422],
			["САХАЛИН",							"ЮЖНО-САХАЛИНСК",					4242],
			["СВЕРДЛОВСКАЯ ОБЛАСТЬ",				"ЕКАТЕРИНБУРГ",						343],
			["СЕВЕРНАЯ ОСЕТИЯ",					"ВЛАДИКАВКАЗ",						8672],
			["СМОЛЕНСКАЯ ОБЛАСТЬ",				"СМОЛЕНСК",							4812],
			["СТАВРОПОЛЬСКИЙ КРАЙ",				"СТАВРОПОЛЬ",						8652],
			["ТАМБОВСКАЯ ОБЛАСТЬ",				"ТАМБОВ",							4752],
			["ТАТАРСТАН",							"КАЗАНЬ",							8432],
			["ТВЕРСКАЯ ОБЛАСТЬ",					"ТВЕРЬ",							4822],
			["ТВЕРСКАЯ ОБЛАСТЬ",					"ТВЕРЬ",							48222],
			["ТОМСКАЯ ОБЛАСТЬ",					"ТОМСК",							3822],
			["ТУВА",								"КЫЗЫЛ",							39422],
			["ТУЛЬСКАЯ ОБЛАСТЬ",					"ТУЛА",								4872],
			["ТЮМЕНСКАЯ ОБЛАСТЬ",					"ТЮМЕНЬ",							3452],
			["УДМУРТИЯ",							"ИЖЕВСК",							3412],
			["УЛЬЯНОВСКАЯ ОБЛАСТЬ",				"УЛЬЯНОВСК",						8422],
			["ХАБАРОВСКИЙ КРАЙ",					"ХАБАРОВСК",						4212],
			["ХАКАСИЯ",							"АБАКАН",							39022],
			["ЧЕЛЯБИНСКАЯ ОБЛАСТЬ",				"ЧЕЛЯБИНСК",						3512],
			["ЧЕЧЕНСКАЯ РЕСПУБЛИКА",				"ГРОЗНЫЙ",							8712],
			["ЧУВАШИЯ",							"ЧЕБОКСАРЫ",						8352],
			["ЧУКОТКА",							"АНАДЫРЬ",							42722],
			["ЯКУТСКАЯ САХА",						"ЯКУТСК",							4112],
			["ЯМАЛО-НЕНЕЦКИЙ ОКРУГ",				"САЛЕХАРД",							34922],
			["ЯРОСЛАВСКАЯ ОБЛАСТЬ",				"ЯРОСЛАВЛЬ",						4852]

		];

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

		if (/\([0-9]{3,5}/.exec(string) == null) { // If we don't have marked city code in string

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