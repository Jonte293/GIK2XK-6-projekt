use webshop;

-- 1. Användare (users)
INSERT INTO users (email, username, first_name, last_name, password, created_at, updated_at)
VALUES
('alice@mail.com', 'alice01', 'Alice', 'Andersson', 'password1', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('bob@mail.com', 'bobby', 'Bob', 'Bengtsson', 'password2', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('charlie@mail.com', 'charlie', 'Charlie', 'Carlsson', 'password3', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('david@mail.com', 'david88', 'David', 'Dahl', 'password4', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('emelie@mail.com', 'emelieX', 'Emelie', 'Ek', 'password5', '2025-01-01 10:00:00', '2025-01-01 10:00:00');

-- 2. Kategorier (categories)
INSERT INTO categories (name, created_at, updated_at)
VALUES
('Energidryck', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Godis', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('PWO', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('kosttillskott', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Proteinpulver', '2025-01-01 10:00:00', '2025-01-01 10:00:00');


-- 3. Produkter (products)
INSERT INTO products (name, price, description, image_url, category_id, created_at, updated_at)
VALUES
('Nocco Caribbean', 25.00, 'Kolsyrad energidryck med smak av tropik.', 'https://nocco.co.uk/wp-content/uploads/sites/2/2024/02/UK_NOCCO_WEBSHOP_Packshot_Burk_2800x2800_CARIBBEAN.png', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Nocco Ramonade', 25.00, 'Kolsyrad energidryck med smak av äpple och melon.', 'https://tyngre.centracdn.net/client/dynamic/images/80_c7c988d0e2-6400-s-full.jpg', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Nocco Persika', 25.00, 'Kolsyrad energidryck med smak av persika.', 'https://tyngre.centracdn.net/client/dynamic/images/702_1da1d0bd7e-se_tyngre_nocco_persika_iihf_trekronor_250214_produktbild_1000x1340-full.jpg', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Nocco Ramonade 12-pack', 150.00, 'Kolsyrad energidryck med äpple och melon.', 'https://nocco.co.uk/wp-content/uploads/sites/2/2024/02/UK_NOCCO_WEBSHOP_Packshot_Trag_2800x2800_RAMONADE-768x768.png', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Nocco Juicy Melba 12-pack', 150.00, 'Kolsyrad energidryck med persika och druva', 'https://nocco.co.uk/wp-content/uploads/sites/2/2024/02/UK_NOCCO_WEBSHOP_Packshot_Trag_2800x2800_JUICYMELBA-768x768.png', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),


('Marabou Mjölkchoklad', 15.50, 'Klassisk mjölkchoklad', 'https://media.delitea.se/product-images/XL/m-mj%C3%B6lkchoklad-200g-0.jpg', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Marabou Skotte', 15.50, 'Klassisk skotte med russin', 'https://images-tastehub.mdlzapps.cloud/images/46db31e3-fd59-4f15-981a-350c97c111ea.png?fm=webp', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Marabou Fransk Nougat', 15.50, 'Klassisk fransman', 'https://privatgrossisten.se/cdn/shop/files/Marabou_Fransk_Nougat_Dubbel_46_G.png', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Marabou Dubbel Nougat', 15.50, 'Klassisk dubbelnugge med hasselnöt och mandel', 'https://privatgrossisten.se/cdn/shop/files/Marabou_Dubbel_Nougat_42_X_43_G.png', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),


('whey-80 Vassleprotein Banan', 200.00, 'Effektiv proteinpulver med smak av banan', 'https://www.tillskottsbolaget.se/img/bilder/artiklar/zoom/STAR001-12_1.jpg', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('whey-80 Vassleprotein jordgubb', 200.00, 'Effektiv proteinpulver med smak av jordgubb', 'https://www.gymgrossisten.com/dw/image/v2/BDJH_PRD/on/demandware.static/-/Sites-hsng-master-catalog/default/dw99dc79a1/Nya_produktbilder/Star_Nutrition/585R_Starnutrition_Whey80_Strawberry_1kg_Feb20.jpg?sw=655&sh=655&sm=fit&sfrm=png', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Fucked up Joker PWO', 200.00, 'Du blir en joker med denna PWO!!', 'https://www.gymgrossisten.com/dw/image/v2/BDJH_PRD/on/demandware.static/-/Sites-hsng-master-catalog/default/dw171a6077/media/GG-Produktbilder/Swedish-supplements/820251r_forest.jpg?sw=655&sh=655&sm=fit&sfrm=png', 3, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Madness PWO Fruit Punch', 200.00, 'Effektiv PWO!!', 'https://www.gymgrossisten.com/dw/image/v2/BDJH_PRD/on/demandware.static/-/Sites-hsng-master-catalog/default/dwc515bb2d/media/GG-Produktbilder/Mutant/3897-025R-_-Mutant-Madness_30-servings-Fruit-Punch_sep24.jpg?sw=655&sh=655&sm=fit&sfrm=png', 3, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('whey-80 Vassleprotein Toasted Marshmallow', 10.00, 'Effektiv proteinpulver med smak av nygrillad marshmallow', 'https://www.gymgrossisten.com/dw/image/v2/BDJH_PRD/on/demandware.static/-/Sites-hsng-master-catalog/default/dwe1ef2e51/media/GG-Produktbilder/Star-Nutrition/5991-Whey-80-1kg-ToastedMarshmallow_0624.jpg?sw=655&sh=655&sm=fit&sfrm=png', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('whey-80 Vassleprotein choklad', 200.00, 'Effektiv proteinpulver med smak av choklad', 'https://www.gymgrossisten.com/dw/image/v2/BDJH_PRD/on/demandware.static/-/Sites-hsng-master-catalog/default/dw96d9f895/Nya_produktbilder/Star_Nutrition/585R_Starnutrition_Whey80_Chocolate_1kg_Feb20.jpg?sw=655&sh=655&sm=fit&sfrm=png', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('whey-80 Vassleprotein Vanilj', 200.00, 'Effektiv proteinpulver med smak av vanilj', 'https://www.tillskottsbolaget.se/img/bilder/artiklar/zoom/STAR001-8_1.jpg', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Barebells proteinbar Peanut Caramel', 20.00, 'Chokladtäckt proteinbar med högt proteininnehåll', 'https://shop.barebells.com/wp-content/uploads/2023/03/US_BB_DTC_VISUAL01_2800x2800_SALTEDPEANUTCARAMEL-v2-1.png', 4, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Barebells proteinbar Marshmallow Rocky Road', 20.00, 'Chokladtäckt proteinbar med högt proteininnehåll', 'https://m.media-amazon.com/images/I/71ZSGTlZ9WL._AC_SL1500_.jpg', 4, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
('Kreatin Monohydrat 500 g', 169.90, 'Helt vanligt Kreatin, vetenskapligt bevisade effekter', 'https://www.gymgrossisten.com/dw/image/v2/BDJH_PRD/on/demandware.static/-/Sites-hsng-master-catalog/default/dw39aeeb15/Nya_produktbilder/Star_Nutrition/609.MASTER_StarNutrition_Creatine_Monohydrate_nov20.jpg?sw=655&sh=655&sm=fit&sfrm=png', 4, '2025-01-01 10:00:00', '2025-01-01 10:00:00');

-- 4. Carts (carts)
INSERT INTO carts (user_id, payed, created_at, updated_at)
VALUES
(1, false, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(2, true,  '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(3, false, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(4, true,  '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(5, false, '2025-01-01 10:00:00', '2025-01-01 10:00:00');

-- 5. CartRows (cart_rows)
INSERT INTO cart_rows (cart_id, product_id, quantity, created_at, updated_at)
VALUES
(1, 1, 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(1, 2, 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(2, 3, 3, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(3, 4, 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(4, 5, 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00');

-- 6. Ratings (ratings)
INSERT INTO ratings (product_id, user_id, score, review, created_at, updated_at)
VALUES
(1, 1, 5, 'Supergod dryck!', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(2, 2, 4, 'Klassiker, alltid gott.', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(3, 3, 3, 'Lite för salt.', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(4, 4, 5, 'Perfekt innan träning.', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(5, 5, 4, 'Fräsch och nyttig!', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(6, 2, 5, 'Bästa smaken jag har provat!', '2025-01-02 10:00:00', '2025-01-02 10:00:00'),
(7, 1, 3, 'Helt okej, men jag förväntade mig mer.', '2025-01-02 10:15:00', '2025-01-02 10:15:00'),
(8, 5, 4, 'Bra produkt, men för dyr.', '2025-01-02 10:30:00', '2025-01-02 10:30:00'),
(9, 5, 2, 'Tyvärr inte min favorit, smakar inte bra.', '2025-01-02 10:45:00', '2025-01-02 10:45:00'),
(10, 2, 5, 'En riktig game-changer!', '2025-01-02 11:00:00', '2025-01-02 11:00:00'),
(11, 1, 4, 'Gillar smaken, men kan vara lite för söt ibland.', '2025-01-03 10:00:00', '2025-01-03 10:00:00');