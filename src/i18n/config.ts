import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "Building Inclusive Cities with Smart Tech",
      "get_started": "Get Started",
      "sign_in": "Sign In",
      "home": "Home",
      "map": "Map",
      "audit": "AI Audit",
      "route": "Route Planner",
      "crossing": "Smart Crossing",
      "sos": "Emergency SOS",
      "volunteer": "Buddy System",
      "iot": "Smart Amenities",
      "challenges": "Urban Hero",
      "impact": "Impact Map",
      "voice": "Voice Nav",
      "welcome_back": "Welcome back",
      "logout": "Logout",
      "report_issue": "New Report",
      "hero_title": "Building <0>Inclusive</0> Cities with Smart Tech",
      "hero_desc": "A comprehensive infrastructure system designed to empower differently-abled and elderly citizens. Using AI, IoT, and real-time GIS mapping to create a barrier-free urban experience.",
      "mobility_title": "Empowering Urban Mobility",
      "mobility_desc": "Our platform combines cutting-edge technology with community participation to solve real-world accessibility challenges.",
      "innovative_features": "Innovative Features",
      "core_tools": "Core Tools",
      "recent_activity": "Recent Activity",
      "explore_map": "Explore Map",
      "explore_map_desc": "Find accessible routes and view reported issues near you.",
      "ai_audit_desc": "Use your camera to scan surroundings for accessibility gaps.",
      "view_all": "View All Activity",
      "stats": {
        "reported": "Issues Reported",
        "resolved": "Resolved",
        "points": "Impact Points",
        "rank": "City Rank"
      },
      "features": {
        "sos_desc": "Instant help from nearby volunteers & services.",
        "buddy_desc": "Request a verified volunteer for assistance.",
        "iot_desc": "Live status of lifts, toilets & signals.",
        "hero_desc": "Complete challenges & earn rewards.",
        "voice_desc": "AI-powered audio guidance for visually impaired.",
        "impact_desc": "Visualize city-wide accessibility improvements."
      }
    }
  },
  hi: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "स्मार्ट तकनीक के साथ समावेशी शहर बनाना",
      "get_started": "शुरू करें",
      "sign_in": "साइन इन करें",
      "home": "होम",
      "map": "नक्शा",
      "audit": "एआई ऑडिट",
      "route": "रूट प्लानर",
      "crossing": "स्मार्ट क्रॉसिंग",
      "sos": "आपातकालीन एसओएस",
      "volunteer": "बडी सिस्टम",
      "iot": "स्मार्ट सुविधाएं",
      "challenges": "अर्बन हीरो",
      "impact": "इम्पैक्ट मैप",
      "voice": "वॉयस नेविगेशन",
      "welcome_back": "वापसी पर स्वागत है",
      "logout": "लॉगआउट",
      "report_issue": "नई रिपोर्ट",
      "stats": {
        "reported": "रिपोर्ट किए गए मुद्दे",
        "resolved": "सुलझाए गए",
        "points": "इम्पैक्ट पॉइंट्स",
        "rank": "सिटी रैंक"
      },
      "features": {
        "sos_desc": "आस-पास के स्वयंसेवकों और सेवाओं से तुरंत मदद।",
        "buddy_desc": "सहायता के लिए एक सत्यापित स्वयंसेवक का अनुरोध करें।",
        "iot_desc": "लिफ्ट, शौचालय और संकेतों की लाइव स्थिति।",
        "hero_desc": "चुनौतियां पूरी करें और पुरस्कार जीतें।",
        "voice_desc": "दृष्टिबाधितों के लिए एआई-संचालित ऑडियो मार्गदर्शन।",
        "impact_desc": "शहर-व्यापी पहुंच सुधारों की कल्पना करें।"
      }
    }
  },
  mr: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "स्मार्ट तंत्रज्ञानासह सर्वसमावेशक शहरे तयार करणे",
      "get_started": "सुरू करा",
      "sign_in": "साइन इन करा",
      "home": "होम",
      "map": "नकाशा",
      "audit": "एआय ऑडिट",
      "route": "रूट प्लॅनर",
      "crossing": "स्मार्ट क्रॉसिंग",
      "sos": "आणीबाणी एसओएस",
      "volunteer": "बडी सिस्टम",
      "iot": "स्मार्ट सुविधा",
      "challenges": "अर्बन हिरो",
      "impact": "इम्पॅक्ट मॅप",
      "voice": "व्हॉइस नेव्हिगेशन",
      "welcome_back": "पुन्हा स्वागत आहे",
      "logout": "लॉगआउट",
      "report_issue": "नवीन रिपोर्ट",
      "stats": {
        "reported": "रिपोर्ट केलेले मुद्दे",
        "resolved": "सोडवलेले",
        "points": "इम्पॅक्ट पॉइंट्स",
        "rank": "सिटी रँक"
      },
      "features": {
        "sos_desc": "जवळपासच्या स्वयंसेवकांकडून आणि सेवांकडून त्वरित मदत।",
        "buddy_desc": "मदतीसाठी सत्यापित स्वयंसेवकाची विनंती करा।",
        "iot_desc": "लिफ्ट, शौचालय आणि सिग्नलची थेट स्थिती।",
        "hero_desc": "आव्हाने पूर्ण करा आणि बक्षिसे मिळवा।",
        "voice_desc": "दृष्टिहीनांसाठी एआय-आधारित ऑडिओ मार्गदर्शन।",
        "impact_desc": "शहरभर सुलभता सुधारणांचे दर्शन।"
      }
    }
  },
  gu: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "સ્માર્ટ ટેકનોલોજી સાથે સમાવેશી શહેરોનું નિર્માણ",
      "get_started": "શરૂ કરો",
      "sign_in": "સાઇન ઇન કરો",
      "home": "હોમ",
      "map": "નકશો",
      "audit": "એઆઈ ઓડિટ",
      "route": "રૂટ પ્લાનર",
      "crossing": "સ્માર્ટ ક્રોસિંગ",
      "sos": "ઇમરજન્સી SOS",
      "volunteer": "બડી સિસ્ટમ",
      "iot": "સ્માર્ટ સુવિધાઓ",
      "challenges": "અર્બન હીરો",
      "impact": "ઇમ્પેક્ટ મેપ",
      "voice": "વોઇસ નેવિગેશન",
      "welcome_back": "ફરી સ્વાગત છે",
      "logout": "લોગઆઉટ",
      "report_issue": "નવો રિપોર્ટ",
      "stats": {
        "reported": "રિપોર્ટ કરેલા મુદ્દાઓ",
        "resolved": "ઉકેલાયેલ",
        "points": "ઇમ્પેક્ટ પોઈન્ટ્સ",
        "rank": "સિટી રેન્ક"
      },
      "features": {
        "sos_desc": "નજીકના સ્વયંસેવકો અને સેવાઓ તરફથી તાત્કાલિક મદદ।",
        "buddy_desc": "સહાય માટે ચકાસાયેલ સ્વયંસેવકની વિનંતી કરો।",
        "iot_desc": "લિફ્ટ, શૌચાલય અને સિગ્નલોની લાઈવ સ્થિતિ।",
        "hero_desc": "પડકારો પૂર્ણ કરો અને ઇનામો મેળવો।",
        "voice_desc": "દૃષ્ટિહીન લોકો માટે AI-સંચાલિત ઓડિયો માર્ગદર્શન।",
        "impact_desc": "શહેરવ્યાપી સુલભતા સુધારાઓની કલ્પના કરો।"
      }
    }
  },
  ta: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "ஸ்மார்ட் தொழில்நுட்பத்துடன் உள்ளடக்கிய நகரங்களை உருவாக்குதல்",
      "get_started": "தொடங்குங்கள்",
      "sign_in": "உள்நுழைக",
      "home": "முகப்பு",
      "map": "வரைபடம்",
      "audit": "AI தணிக்கை",
      "route": "பாதை திட்டமிடுபவர்",
      "crossing": "ஸ்மார்ட் கிராசிங்",
      "sos": "அவசர SOS",
      "volunteer": "நண்பர் அமைப்பு",
      "iot": "ஸ்மார்ட் வசதிகள்",
      "challenges": "நகர நாயகன்",
      "impact": "தாக்க வரைபடம்",
      "voice": "குரல் வழிசெலுத்தல்",
      "welcome_back": "மீண்டும் வருக",
      "logout": "வெளியேறு",
      "report_issue": "புதிய அறிக்கை",
      "stats": {
        "reported": "அறிவிக்கப்பட்ட சிக்கல்கள்",
        "resolved": "தீர்க்கப்பட்டவை",
        "points": "தாக்க புள்ளிகள்",
        "rank": "நகர தரவரிசை"
      },
      "features": {
        "sos_desc": "அருகிலுள்ள தன்னார்வலர்கள் மற்றும் சேவைகளிடமிருந்து உடனடி உதவி।",
        "buddy_desc": "உதவிக்கு சரிபார்க்கப்பட்ட தன்னார்வலரை கோருங்கள்।",
        "iot_desc": "மின்தூக்கிகள், கழிப்பறைகள் மற்றும் சிக்னல்களின் நேரடி நிலை।",
        "hero_desc": "சவால்களை முடித்து வெகுமதிகளைப் பெறுங்கள்।",
        "voice_desc": "பார்வையற்றோருக்கான AI-இயங்கும் ஆடியோ வழிகாட்டுதல்।",
        "impact_desc": "நகரம் தழுவிய அணுகல் மேம்பாடுகளைக் காட்சிப்படுத்துங்கள்।"
      }
    }
  },
  te: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "స్మార్ట్ టెక్నాలజీతో సమ్మిళిత నగరాల నిర్మాణం",
      "get_started": "ప్రారంభించండి",
      "sign_in": "సైన్ ఇన్ చేయండి",
      "home": "హోమ్",
      "map": "మ్యాప్",
      "audit": "AI ఆడిట్",
      "route": "రూట్ ప్లానర్",
      "crossing": "స్మార్ట్ క్రాసింగ్",
      "sos": "అత్యవసర SOS",
      "volunteer": "బడ్డీ సిస్టమ్",
      "iot": "స్మార్ట్ సౌకర్యాలు",
      "challenges": "అర్బన్ హీరో",
      "impact": "ఇంపాక్ట్ మ్యాప్",
      "voice": "వాయిస్ నావిగేషన్",
      "welcome_back": "తిరిగి స్వాగతం",
      "logout": "లాగ్అవుట్",
      "report_issue": "కొత్త రిపోర్ట్",
      "stats": {
        "reported": "నివేదించబడిన సమస్యలు",
        "resolved": "పరిష్కరించబడినవి",
        "points": "ఇంపాక్ట్ పాయింట్లు",
        "rank": "సిటీ ర్యాంక్"
      },
      "features": {
        "sos_desc": "సమీపంలోని వాలంటీర్లు మరియు సేవల నుండి తక్షణ సహాయం।",
        "buddy_desc": "సహాయం కోసం ధృవీకరించబడిన వాలంటీర్‌ను అభ్యర్థించండి।",
        "iot_desc": "లిఫ్ట్‌లు, టాయిలెట్లు మరియు సిగ్నల్స్ ప్రత్యక్ష స్థితి।",
        "hero_desc": "సవాళ్లను పూర్తి చేయండి మరియు రివార్డులను పొందండి।",
        "voice_desc": "దృష్టి లోపం ఉన్నవారి కోసం AI-ఆధారిత ఆడియో మార్గదర్శకత్వం।",
        "impact_desc": "నగరం అంతటా ప్రాప్యత మెరుగుదలలను దృశ్యమానం చేయండి।"
      }
    }
  },
  kn: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "ಸ್ಮಾರ್ಟ್ ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಅಂತರ್ಗತ ನಗರಗಳ ನಿರ್ಮಾಣ",
      "get_started": "ಪ್ರಾರಂಭಿಸಿ",
      "sign_in": "ಸೈನ್ ಇನ್ ಮಾಡಿ",
      "home": "ಹೋಮ್",
      "map": "ನಕ್ಷೆ",
      "audit": "AI ಆಡಿಟ್",
      "route": "ರೂಟ್ ಪ್ಲಾನರ್",
      "crossing": "ಸ್ಮಾರ್ಟ್ ಕ್ರಾಸಿಂಗ್",
      "sos": "ತುರ್ತು SOS",
      "volunteer": "ಬಡ್ಡಿ ಸಿಸ್ಟಮ್",
      "iot": "ಸ್ಮಾರ್ಟ್ ಸೌಲಭ್ಯಗಳು",
      "challenges": "ಅರ್ಬನ್ ಹೀರೋ",
      "impact": "ಇಂಪ್ಯಾಕ್ಟ್ ಮ್ಯಾಪ್",
      "voice": "ಧ್ವನಿ ನ್ಯಾವಿಗೇಷನ್",
      "welcome_back": "ಮರಳಿ ಸ್ವಾಗತ",
      "logout": "ಲಾಗ್ಔಟ್",
      "report_issue": "ಹೊಸ ವರದಿ",
      "stats": {
        "reported": "ವರದಿಯಾದ ಸಮಸ್ಯೆಗಳು",
        "resolved": "ಪರಿಹರಿಸಲಾಗಿದೆ",
        "points": "ಇಂಪ್ಯಾಕ್ಟ್ ಪಾಯಿಂಟ್ಗಳು",
        "rank": "ಸಿಟಿ ರ್ಯಾಂಕ್"
      },
      "features": {
        "sos_desc": "ಹತ್ತಿರದ ಸ್ವಯಂಸೇವಕರು ಮತ್ತು ಸೇವೆಗಳಿಂದ ತಕ್ಷಣದ ಸಹಾಯ।",
        "buddy_desc": "ಸಹಾಯಕ್ಕಾಗಿ ಪರಿಶೀಲಿಸಿದ ಸ್ವಯಂಸೇವಕರನ್ನು ವಿನಂತಿಸಿ।",
        "iot_desc": "ಲಿಫ್ಟ್‌ಗಳು, ಶೌಚಾಲಯಗಳು ಮತ್ತು ಸಿಗ್ನಲ್‌ಗಳ ಲೈವ್ ಸ್ಥಿತಿ।",
        "hero_desc": "ಸವಾಲುಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ಬಹುಮಾನಗಳನ್ನು ಗೆಲ್ಲಿರಿ।",
        "voice_desc": "ದೃಷ್ಟಿಹೀನರಿಗಾಗಿ AI-ಚಾಲಿತ ಆಡಿಯೊ ಮಾರ್ಗದರ್ಶನ।",
        "impact_desc": "ನಗರದಾದ್ಯಂತ ಪ್ರವೇಶದ ಸುಧಾರಣೆಗಳನ್ನು ದೃಶ್ಯೀಕರಿಸಿ।"
      }
    }
  },
  bn: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "স্মার্ট প্রযুক্তির মাধ্যমে অন্তর্ভুক্তিমূলক শহর নির্মাণ",
      "get_started": "শুরু করুন",
      "sign_in": "সাইন ইন করুন",
      "home": "হোম",
      "map": "মানচিত্র",
      "audit": "এআই অডিট",
      "route": "রুট প্ল্যানার",
      "crossing": "স্মার্ট ক্রসিং",
      "sos": "জরুরী এসওএস",
      "volunteer": "বাডি সিস্টেম",
      "iot": "স্মার্ট সুবিধা",
      "challenges": "আরবান হিরো",
      "impact": "ইমপ্যাক্ট ম্যাপ",
      "voice": "ভয়েস নেভিগেশন",
      "welcome_back": "স্বাগতম",
      "logout": "লগআউট",
      "report_issue": "নতুন রিপোর্ট",
      "stats": {
        "reported": "রিপোর্ট করা সমস্যা",
        "resolved": "সমাধান করা হয়েছে",
        "points": "ইমপ্যাক্ট পয়েন্ট",
        "rank": "সিটি র‍্যাঙ্ক"
      },
      "features": {
        "sos_desc": "কাছাকাছি স্বেচ্ছাসেবক এবং পরিষেবা থেকে তাৎক্ষণিক সাহায্য।",
        "buddy_desc": "সহায়তার জন্য একজন যাচাইকৃত স্বেচ্ছাসেবকের অনুরোধ করুন।",
        "iot_desc": "লিফট, টয়লেট এবং সিগন্যালের লাইভ স্ট্যাটাস।",
        "hero_desc": "চ্যালেঞ্জগুলি সম্পূর্ণ করুন এবং পুরস্কার জিতুন।",
        "voice_desc": "দৃষ্টিপ্রতিবন্ধীদের জন্য এআই-চালিত অডিও নির্দেশিকা।",
        "impact_desc": "শহরব্যাপী অ্যাক্সেসিবিলিটি উন্নতির চিত্রায়ন।"
      }
    }
  },
  pa: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "ਸਮਾਰਟ ਤਕਨਾਲੋਜੀ ਨਾਲ ਸੰਮਲਿਤ ਸ਼ਹਿਰਾਂ ਦਾ ਨਿਰਮਾਣ",
      "get_started": "ਸ਼ੁਰੂ ਕਰੋ",
      "sign_in": "ਸਾਈਨ ਇਨ ਕਰੋ",
      "home": "ਹੋਮ",
      "map": "ਨਕਸ਼ਾ",
      "audit": "AI ਆਡਿਟ",
      "route": "ਰੂਟ ਪਲਾਨਰ",
      "crossing": "ਸਮਾਰਟ ਕਰਾਸਿੰਗ",
      "sos": "ਐਮਰਜੈਂਸੀ SOS",
      "volunteer": "ਬਡੀ ਸਿਸਟਮ",
      "iot": "ਸਮਾਰਟ ਸਹੂਲਤਾਂ",
      "challenges": "ਅਰਬਨ ਹੀਰੋ",
      "impact": "ਇਮਪੈਕਟ ਮੈਪ",
      "voice": "ਵੌਇਸ ਨੇਵੀਗੇਸ਼ਨ",
      "welcome_back": "ਜੀ ਆਇਆਂ ਨੂੰ",
      "logout": "ਲੌਗਆਊਟ",
      "report_issue": "ਨਵੀਂ ਰਿਪੋਰਟ",
      "stats": {
        "reported": "ਰਿਪੋਰਟ ਕੀਤੇ ਮੁੱਦੇ",
        "resolved": "ਹੱਲ ਕੀਤੇ ਗਏ",
        "points": "ਇਮਪੈਕਟ ਪੁਆਇੰਟ",
        "rank": "ਸ਼ਹਿਰ ਰੈਂਕ"
      },
      "features": {
        "sos_desc": "ਨੇੜਲੇ ਵਾਲੰਟੀਅਰਾਂ ਅਤੇ ਸੇਵਾਵਾਂ ਤੋਂ ਤੁਰੰਤ ਮਦਦ।",
        "buddy_desc": "ਸਹਾਇਤਾ ਲਈ ਇੱਕ ਪ੍ਰਮਾਣਿਤ ਵਾਲੰਟੀਅਰ ਦੀ ਬੇਨਤੀ ਕਰੋ।",
        "iot_desc": "ਲਿਫਟਾਂ, ਪਖਾਨੇ ਅਤੇ ਸਿਗਨਲਾਂ ਦੀ ਲਾਈਵ ਸਥਿਤੀ।",
        "hero_desc": "ਚੁਣੌਤੀਆਂ ਪੂਰੀਆਂ ਕਰੋ ਅਤੇ ਇਨਾਮ ਜਿੱਤੋ।",
        "voice_desc": "ਨੇਤਰਹੀਣਾਂ ਲਈ AI-ਸੰਚਾਲਿਤ ਆਡੀਓ ਮਾਰਗਦਰਸ਼ਨ।",
        "impact_desc": "ਸ਼ਹਿਰ-ਵਿਆਪੀ ਪਹੁੰਚਯੋਗਤਾ ਸੁਧਾਰਾਂ ਦੀ ਕਲਪਨਾ ਕਰੋ।"
      }
    }
  },
  ur: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "سمارٹ ٹیکنالوجی کے ساتھ جامع شہروں کی تعمیر",
      "get_started": "شروع کریں",
      "sign_in": "سائن ان کریں",
      "home": "ہوم",
      "map": "نقشہ",
      "audit": "AI آڈٹ",
      "route": "روٹ پلانر",
      "crossing": "سمارٹ کراسنگ",
      "sos": "ہنگامی SOS",
      "volunteer": "بڈی سسٹم",
      "iot": "سمارٹ سہولیات",
      "challenges": "اربن ہیرو",
      "impact": "اثر کا نقشہ",
      "voice": "وائس نیویگیشن",
      "welcome_back": "خوش آمدید",
      "logout": "لاگ آؤٹ",
      "report_issue": "نئی رپورٹ",
      "stats": {
        "reported": "رپورٹ کردہ مسائل",
        "resolved": "حل شدہ",
        "points": "اثر پوائنٹس",
        "rank": "سٹی رینک"
      },
      "features": {
        "sos_desc": "قریبی رضاکاروں اور خدمات سے فوری مدد۔",
        "buddy_desc": "مدد کے لیے ایک تصدیق شدہ رضاکار کی درخواست کریں۔",
        "iot_desc": "لفٹوں، بیت الخلاء اور سگنلز کی براہ راست صورتحال۔",
        "hero_desc": "چیلنجز مکمل کریں اور انعامات جیتیں۔",
        "voice_desc": "نابینا افراد کے لیے AI سے چلنے والی آڈیو رہنمائی۔",
        "impact_desc": "شہر بھر میں رسائی کی بہتری کا تصور کریں۔"
      }
    }
  },
  es: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "Construyendo ciudades inclusivas con tecnología inteligente",
      "get_started": "Empezar",
      "sign_in": "Iniciar sesión",
      "home": "Inicio",
      "map": "Mapa",
      "audit": "Auditoría IA",
      "route": "Planificador de rutas",
      "crossing": "Cruce inteligente",
      "sos": "SOS de emergencia",
      "volunteer": "Sistema de compañeros",
      "iot": "Servicios inteligentes",
      "challenges": "Héroe urbano",
      "impact": "Mapa de impacto",
      "voice": "Nav de voz",
      "welcome_back": "Bienvenido de nuevo",
      "logout": "Cerrar sesión",
      "report_issue": "Nuevo informe",
      "stats": {
        "reported": "Problemas reportados",
        "resolved": "Resueltos",
        "points": "Puntos de impacto",
        "rank": "Rango en la ciudad"
      },
      "features": {
        "sos_desc": "Ayuda instantánea de voluntarios y servicios cercanos.",
        "buddy_desc": "Solicite un voluntario verificado para asistencia.",
        "iot_desc": "Estado en vivo de ascensores, baños y señales.",
        "hero_desc": "Completa desafíos y gana recompensas.",
        "voice_desc": "Guía de audio con IA para personas con discapacidad visual.",
        "impact_desc": "Visualice las mejoras de accesibilidad en toda la ciudad."
      }
    }
  },
  fr: {
    translation: {
      "app_name": "InclusiveCity",
      "tagline": "Bâtir des villes inclusives grâce à la technologie intelligente",
      "get_started": "Commencer",
      "sign_in": "Se connecter",
      "home": "Accueil",
      "map": "Carte",
      "audit": "Audit IA",
      "route": "Planificateur",
      "crossing": "Passage intelligent",
      "sos": "SOS d'urgence",
      "volunteer": "Système de parrainage",
      "iot": "Services intelligents",
      "challenges": "Héros urbain",
      "impact": "Carte d'impact",
      "voice": "Nav vocale",
      "welcome_back": "Bon retour",
      "logout": "Déconnexion",
      "report_issue": "Nouveau rapport",
      "stats": {
        "reported": "Problèmes signalés",
        "resolved": "Résolus",
        "points": "Points d'impact",
        "rank": "Rang dans la ville"
      },
      "features": {
        "sos_desc": "Aide instantanée des bénévoles et services à proximité.",
        "buddy_desc": "Demandez un bénévole vérifié pour assistance.",
        "iot_desc": "État en direct des ascenseurs, toilettes et signaux.",
        "hero_desc": "Relevez des défis et gagnez des récompenses.",
        "voice_desc": "Guidage audio par IA pour les malvoyants.",
        "impact_desc": "Visualisez les améliorations d'accessibilité dans toute la ville."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
