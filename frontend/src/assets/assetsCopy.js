import p_img1 from './p_img1.png'
import p_img2_1 from './p_img2_1.png'
import p_img2_2 from './p_img2_2.png'
import p_img2_3 from './p_img2_3.png'
import p_img2_4 from './p_img2_4.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'
import p_img5 from './p_img5.png'
import p_img6 from './p_img6.png'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
import p_img15 from './p_img15.png'
import p_img16 from './p_img16.png'
import p_img17 from './p_img17.png'
import p_img18 from './p_img18.png'
import p_img19 from './p_img19.png'
import p_img20 from './p_img20.png'
import p_img21 from './p_img21.png'
import p_img22 from './p_img22.png'
import p_img23 from './p_img23.png'
import p_img24 from './p_img24.png'
import p_img25 from './p_img25.png'
import p_img26 from './p_img26.png'
import p_img27 from './p_img27.png'
import p_img28 from './p_img28.png'
import p_img29 from './p_img29.png'
import p_img30 from './p_img30.png'
import p_img31 from './p_img31.png'
import p_img32 from './p_img32.png'
import p_img33 from './p_img33.png'
import p_img34 from './p_img34.png'
import p_img35 from './p_img35.png'
import p_img36 from './p_img36.png'
import p_img37 from './p_img37.png'
import p_img38 from './p_img38.png'
import p_img39 from './p_img39.png'
import p_img40 from './p_img40.png'
import p_img41 from './p_img41.png'
import p_img42 from './p_img42.png'
import p_img43 from './p_img43.png'
import p_img44 from './p_img44.png'
import p_img45 from './p_img45.png'
import p_img46 from './p_img46.png'
import p_img47 from './p_img47.png'
import p_img48 from './p_img48.png'
import p_img49 from './p_img49.png'
import p_img50 from './p_img50.png'
import p_img51 from './p_img51.png'
import p_img52 from './p_img52.png'

import logo from './logo.svg'
import hero_img from './hero_img.jpg'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.jpg'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

// ОПЦИИ ДЛЯ КОНСТРУКТОРА ШОКОЛАДА
export const products = [
    // ========== ФОРМЫ (category: "form") ==========
    {
        _id: "form_001",
        name: "Сердце",
        description: "Романтичная форма сердца — идеальный выбор для признания в любви, дня Святого Валентина или годовщины. Шоколад в форме сердца подчеркнёт ваши чувства.",
        price: 0,
        image: [p_img1],
        category: "form",
        subCategory: "form",
        sizes: ["250г", "500г"],
        bestseller: true,
        date: 1716634345448,
        slug: "serdtse",
        isAvailable: true,
        defaultOption: true
    },
    {
        _id: "form_002",
        name: "Круг",
        description: "Классическая круглая форма — символ гармонии и совершенства. Подходит для любого повода: день рождения, корпоративный подарок или просто так.",
        price: 0,
        image: [p_img2_1, p_img2_2, p_img2_3, p_img2_4],
        category: "form",
        subCategory: "form",
        sizes: ["250г", "500г"],
        bestseller: true,
        date: 1716621345448,
        slug: "krug",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "form_003",
        name: "Квадрат",
        description: "Строгая квадратная форма — выбор деловых людей и минималистов. Отлично подходит для подарка коллегам или начальнику.",
        price: 0,
        image: [p_img3],
        category: "form",
        subCategory: "form",
        sizes: ["250г", "500г"],
        bestseller: false,
        date: 1716234545448,
        slug: "kvadrat",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "form_004",
        name: "Звезда",
        description: "Звёздная форма — для тех, кто хочет сиять и выделяться. Идеально для новогодних праздников и дней рождения.",
        price: 50,
        image: [p_img4],
        category: "form",
        subCategory: "form",
        sizes: ["250г", "500г"],
        bestseller: false,
        date: 1716621345448,
        slug: "zvezda",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "form_005",
        name: "Прямоугольник",
        description: "Удобная прямоугольная форма — классика, которая всегда в моде. Легко упаковывается и дарится.",
        price: 0,
        image: [p_img5],
        category: "form",
        subCategory: "form",
        sizes: ["250г", "500г"],
        bestseller: false,
        date: 1716622345448,
        slug: "pryamougolnik",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "form_006",
        name: "Полумесяц",
        description: "Загадочная форма полумесяца. Отличный выбор для романтического вечера или подарка загадочной личности.",
        price: 70,
        image: [p_img6],
        category: "form",
        subCategory: "form",
        sizes: ["250г", "500г"],
        bestseller: false,
        date: 1716623423448,
        slug: "polumesyats",
        isAvailable: true,
        defaultOption: false
    },

    // ========== ОСНОВЫ (category: "base") ==========
    {
        _id: "base_001",
        name: "Тёмный шоколад 70%",
        description: "Насыщенный горьковатый вкус с высоким содержанием какао. Для истинных ценителей. Содержит 70% какао-продуктов.",
        price: 0,
        image: [p_img7],
        category: "base",
        subCategory: "base",
        sizes: ["250г", "500г"],
        bestseller: true,
        date: 1716621542448,
        slug: "temnyy-70",
        isAvailable: true,
        defaultOption: true
    },
    {
        _id: "base_002",
        name: "Молочный шоколад",
        description: "Нежный сливочный вкус, который любят и взрослые, и дети. Идеальный баланс какао и молока.",
        price: 0,
        image: [p_img8],
        category: "base",
        subCategory: "base",
        sizes: ["250г", "500г"],
        bestseller: true,
        date: 1716622345448,
        slug: "molochnyy",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "base_003",
        name: "Белый шоколад",
        description: "Сладкий ванильный вкус без какао-порошка. Идеально сочетается с ягодными начинками.",
        price: 0,
        image: [p_img9],
        category: "base",
        subCategory: "base",
        sizes: ["250г", "500г"],
        bestseller: false,
        date: 1716621235448,
        slug: "belyy",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "base_004",
        name: "Рубиновый шоколад",
        description: "Редкий розовый шоколад с ягодными нотками. Уникальный вкус и цвет. Не требует добавок, сам по себе деликатес.",
        price: 100,
        image: [p_img10],
        category: "base",
        subCategory: "base",
        sizes: ["250г", "500г"],
        bestseller: false,
        date: 1716622235448,
        slug: "rubinovyy",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "base_005",
        name: "Тёмный шоколад 85%",
        description: "Для настоящих гурманов. Интенсивный горький вкус с минимальным содержанием сахара. 85% какао.",
        price: 50,
        image: [p_img11],
        category: "base",
        subCategory: "base",
        sizes: ["250г", "500г"],
        bestseller: false,
        date: 1716623345448,
        slug: "temnyy-85",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "base_006",
        name: "Веганский тёмный",
        description: "Растительный шоколад без молочных продуктов. На основе орехового молока. Для веганов и аллергиков.",
        price: 80,
        image: [p_img12],
        category: "base",
        subCategory: "base",
        sizes: ["250г", "500г"],
        bestseller: false,
        date: 1716624445448,
        slug: "veganskiy",
        isAvailable: true,
        defaultOption: false
    },

    // ========== НАЧИНКИ (category: "filling") ==========
    {
        _id: "filling_001",
        name: "Карамель",
        description: "Тягучая солёная карамель — хит продаж! Нежная, тягучая, с нотками морской соли.",
        price: 50,
        image: [p_img13],
        category: "filling",
        subCategory: "filling",
        sizes: [],
        bestseller: true,
        date: 1716625545448,
        slug: "karamel",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "filling_002",
        name: "Малина",
        description: "Свежая ягодная кислинка, которая отлично балансирует сладость шоколада. Натуральное малиновое пюре.",
        price: 70,
        image: [p_img14],
        category: "filling",
        subCategory: "filling",
        sizes: [],
        bestseller: true,
        date: 1716626645448,
        slug: "malina",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "filling_003",
        name: "Фундук",
        description: "Хрустящий фундук в карамели — приятная текстура и ореховый аромат. Кусочки цельного ореха.",
        price: 60,
        image: [p_img15],
        category: "filling",
        subCategory: "filling",
        sizes: [],
        bestseller: false,
        date: 1716627745448,
        slug: "funduk",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "filling_004",
        name: "Трюфель",
        description: "Нежный сливочный трюфель — для настоящих гурманов. Тает во рту.",
        price: 90,
        image: [p_img16],
        category: "filling",
        subCategory: "filling",
        sizes: [],
        bestseller: false,
        date: 1716628845448,
        slug: "tryufel",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "filling_005",
        name: "Клубника",
        description: "Сладкая клубника с лёгкой кислинкой. Летнее настроение в каждом кусочке.",
        price: 70,
        image: [p_img17],
        category: "filling",
        subCategory: "filling",
        sizes: [],
        bestseller: false,
        date: 1716629945448,
        slug: "klubnika",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "filling_006",
        name: "Мятный крем",
        description: "Свежий мятный крем с шоколадной крошкой. Освежает и бодрит.",
        price: 60,
        image: [p_img18],
        category: "filling",
        subCategory: "filling",
        sizes: [],
        bestseller: false,
        date: 1716631045448,
        slug: "myata",
        isAvailable: true,
        defaultOption: false
    },

    // ========== ДЕКОР (category: "decor") ==========
    {
        _id: "decor_001",
        name: "Золотая посыпка",
        description: "Эффектный золотой декор для праздничного настроения. Пищевое золото, безопасно для здоровья.",
        price: 80,
        image: [p_img19],
        category: "decor",
        subCategory: "decor",
        sizes: [],
        bestseller: true,
        date: 1716632145448,
        slug: "zolotaya",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "decor_002",
        name: "Серебряная посыпка",
        description: "Элегантный серебряный блеск. Подходит для любого торжества.",
        price: 80,
        image: [p_img20],
        category: "decor",
        subCategory: "decor",
        sizes: [],
        bestseller: false,
        date: 1716633245448,
        slug: "serebryanaya",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "decor_003",
        name: "Цветная посыпка",
        description: "Радужная посыпка — весело и ярко. Идеально для детского праздника.",
        price: 60,
        image: [p_img21],
        category: "decor",
        subCategory: "decor",
        sizes: [],
        bestseller: false,
        date: 1716634345448,
        slug: "tsvetnaya",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "decor_004",
        name: "Съедобные цветы",
        description: "Нежные сушёные цветы для изысканного декора. Лаванда, васильки, розы.",
        price: 120,
        image: [p_img22],
        category: "decor",
        subCategory: "decor",
        sizes: [],
        bestseller: false,
        date: 1716635445448,
        slug: "tsvety",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "decor_005",
        name: "Шоколадные перья",
        description: "Изящные перья из белого и тёмного шоколада. Для особых случаев.",
        price: 100,
        image: [p_img23],
        category: "decor",
        subCategory: "decor",
        sizes: [],
        bestseller: false,
        date: 1716636545448,
        slug: "perya",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "decor_006",
        name: "Ореховая крошка",
        description: "Хрустящая крошка из миндаля и фундука. Добавляет текстуру и ореховый аромат.",
        price: 50,
        image: [p_img24],
        category: "decor",
        subCategory: "decor",
        sizes: [],
        bestseller: false,
        date: 1716637645448,
        slug: "oreshki",
        isAvailable: true,
        defaultOption: false
    },

    // ========== УПАКОВКИ (category: "packaging") ==========
    {
        _id: "pack_001",
        name: "Стандартная коробка",
        description: "Классическая картонная коробка с окошком. Простая и надёжная упаковка.",
        price: 0,
        image: [p_img25],
        category: "packaging",
        subCategory: "packaging",
        sizes: [],
        bestseller: true,
        date: 1716638745448,
        slug: "standart",
        isAvailable: true,
        defaultOption: true
    },
    {
        _id: "pack_002",
        name: "Подарочная коробка",
        description: "Праздничная коробка с лентой и открыткой. Красивая упаковка для особого подарка.",
        price: 100,
        image: [p_img26],
        category: "packaging",
        subCategory: "packaging",
        sizes: [],
        bestseller: true,
        date: 1716639845448,
        slug: "podoarochnaya",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "pack_003",
        name: "Прозрачная упаковка",
        description: "Прозрачный бокс — шоколад виден сразу. Подходит для десертных столов и фотозон.",
        price: 70,
        image: [p_img27],
        category: "packaging",
        subCategory: "packaging",
        sizes: [],
        bestseller: false,
        date: 1716640945448,
        slug: "prozrachnaya",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "pack_004",
        name: "Деревянная шкатулка",
        description: "Экологичная деревянная шкатулка — многоразовая упаковка. После шоколада можно использовать для хранения украшений.",
        price: 200,
        image: [p_img28],
        category: "packaging",
        subCategory: "packaging",
        sizes: [],
        bestseller: false,
        date: 1716642045448,
        slug: "derevyannaya",
        isAvailable: true,
        defaultOption: false
    },
    {
        _id: "pack_005",
        name: "Металлическая банка",
        description: "Стильная жестяная банка с винтажным дизайном. Можно хранить после использования.",
        price: 150,
        image: [p_img29],
        category: "packaging",
        subCategory: "packaging",
        sizes: [],
        bestseller: false,
        date: 1716643145448,
        slug: "banka",
        isAvailable: true,
        defaultOption: false
    }
]

// ПОПУЛЯРНЫЕ КОМБИНАЦИИ (для блока "Популярные комбинации")
export const popularCombinations = [
    {
        _id: "combo_001",
        name: "Романтический вечер",
        description: "Идеальный подарок для второй половинки. Нежный вкус и романтичная форма.",
        image: p_img30,
        price: 250,
        options: {
            form: "form_001",      // Сердце
            base: "base_002",      // Молочный
            filling: ["filling_002"], // Малина
            decor: ["decor_001"],  // Золотая посыпка
            packaging: "pack_002"  // Подарочная
        },
        usageCount: 156,
        tags: ["подарок", "романтика", "любовь"]
    },
    {
        _id: "combo_002",
        name: "Новогоднее настроение",
        description: "Праздничная комбинация для встречи Нового года.",
        image: p_img31,
        price: 300,
        options: {
            form: "form_004",      // Звезда
            base: "base_003",      // Белый
            filling: ["filling_003"], // Фундук
            decor: ["decor_002", "decor_003"], // Серебряная + Цветная
            packaging: "pack_002"  // Подарочная
        },
        usageCount: 89,
        tags: ["новый год", "праздник", "зима"]
    },
    {
        _id: "combo_003",
        name: "Для гурманов",
        description: "Для истинных ценителей шоколада. Интенсивный вкус и изысканный декор.",
        image: p_img32,
        price: 380,
        options: {
            form: "form_002",      // Круг
            base: "base_005",      // Тёмный 85%
            filling: ["filling_004"], // Трюфель
            decor: ["decor_004"],  // Съедобные цветы
            packaging: "pack_004"  // Деревянная
        },
        usageCount: 67,
        tags: ["гурманы", "премиум", "эксклюзив"]
    },
    {
        _id: "combo_004",
        name: "Детская радость",
        description: "Яркий и сладкий шоколад, который понравится детям.",
        image: p_img33,
        price: 200,
        options: {
            form: "form_005",      // Прямоугольник
            base: "base_002",      // Молочный
            filling: ["filling_001"], // Карамель
            decor: ["decor_003"],  // Цветная посыпка
            packaging: "pack_003"  // Прозрачная
        },
        usageCount: 112,
        tags: ["детям", "праздник", "сладкое"]
    },
    {
        _id: "combo_005",
        name: "Элегантная классика",
        description: "Сдержанный вкус и минималистичный дизайн. Для делового подарка.",
        image: p_img34,
        price: 220,
        options: {
            form: "form_003",      // Квадрат
            base: "base_001",      // Тёмный 70%
            filling: [],
            decor: [],
            packaging: "pack_001"  // Стандартная
        },
        usageCount: 95,
        tags: ["классика", "деловой", "минимализм"]
    }
]

// ДЛЯ ТОПА ИНГРЕДИЕНТОВ (можно использовать на основе popularity)
export const topOptionsByCategory = {
    form: ["form_001", "form_002", "form_004"],
    base: ["base_001", "base_002", "base_004"],
    filling: ["filling_001", "filling_002", "filling_004"],
    decor: ["decor_001", "decor_004", "decor_003"],
    packaging: ["pack_002", "pack_001", "pack_004"]
}