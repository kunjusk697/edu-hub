const fs = require('fs');
const path = require('path');

const products = [
  ['aura-kadai-22-glass', 'Aura Kadai 22 (Glass Lid)', 3490, 'cookware', 'Aura', 'Tri-ply kadai with glass lid', ['3-layer SS construction', 'Induction safe', '5-year warranty'], '22 cm', 'Glass lid'],
  ['aura-kadai-22-steel', 'Aura Kadai 22 (Steel Lid)', 3550, 'cookware', 'Aura', 'Tri-ply kadai with steel lid', ['3-layer SS construction', 'Induction safe', '5-year warranty'], '22 cm', 'Steel lid'],
  ['aura-kadai-24-glass', 'Aura Kadai 24 (Glass Lid)', 4190, 'cookware', 'Aura', 'Tri-ply kadai with glass lid', ['3-layer SS construction', 'Induction safe', '5-year warranty'], '24 cm', 'Glass lid'],
  ['aura-kadai-24-steel', 'Aura Kadai 24 (Steel Lid)', 4250, 'cookware', 'Aura', 'Tri-ply kadai with steel lid', ['3-layer SS construction', 'Induction safe', '5-year warranty'], '24 cm', 'Steel lid'],
  ['aura-kadai-26-glass', 'Aura Kadai 26 (Glass Lid)', 4450, 'cookware', 'Aura', 'Tri-ply kadai with glass lid', ['3-layer SS construction', 'Induction safe', '5-year warranty'], '26 cm', 'Glass lid'],
  ['aura-kadai-26-steel', 'Aura Kadai 26 (Steel Lid)', 4590, 'cookware', 'Aura', 'Tri-ply kadai with steel lid', ['3-layer SS construction', 'Induction safe', '5-year warranty'], '26 cm', 'Steel lid'],
  ['aura-frypan-22', 'Aura Fry Pan 22 (Without Lid)', 2850, 'cookware', 'Aura', 'Tri-ply fry pan', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '22 cm', null],
  ['aura-frypan-22-steel', 'Aura Fry Pan 22 (Steel Lid)', 3590, 'cookware', 'Aura', 'Tri-ply fry pan with steel lid', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '22 cm', 'Steel lid'],
  ['aura-frypan-22-glass', 'Aura Fry Pan 22 (Glass Lid)', 3550, 'cookware', 'Aura', 'Tri-ply fry pan with glass lid', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '22 cm', 'Glass lid'],
  ['aura-frypan-24', 'Aura Fry Pan 24 (Without Lid)', 3350, 'cookware', 'Aura', 'Tri-ply fry pan', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '24 cm', null],
  ['aura-frypan-24-steel', 'Aura Fry Pan 24 (Steel Lid)', 4150, 'cookware', 'Aura', 'Tri-ply fry pan with steel lid', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '24 cm', 'Steel lid'],
  ['aura-frypan-24-glass', 'Aura Fry Pan 24 (Glass Lid)', 4090, 'cookware', 'Aura', 'Tri-ply fry pan with glass lid', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '24 cm', 'Glass lid'],
  ['aura-frypan-26', 'Aura Fry Pan 26 (Without Lid)', 3750, 'cookware', 'Aura', 'Tri-ply fry pan', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '26 cm', null],
  ['aura-frypan-26-steel', 'Aura Fry Pan 26 (Steel Lid)', 4750, 'cookware', 'Aura', 'Tri-ply fry pan with steel lid', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '26 cm', 'Steel lid'],
  ['aura-frypan-26-glass', 'Aura Fry Pan 26 (Glass Lid)', 4590, 'cookware', 'Aura', 'Tri-ply fry pan with glass lid', ['Even heat distribution', 'Dishwasher safe', '5-year warranty'], '26 cm', 'Glass lid'],
  ['aura-saucepan-14', 'Aura Sauce Pan 14 (Without Lid)', 2550, 'cookware', 'Aura', 'Tri-ply sauce pan', ['Fast heating aluminium core', '5-year warranty'], '14 cm', null],
  ['aura-saucepan-14-steel', 'Aura Sauce Pan 14 (Steel Lid)', 2990, 'cookware', 'Aura', 'Tri-ply sauce pan with steel lid', ['Fast heating aluminium core', '5-year warranty'], '14 cm', 'Steel lid'],
  ['aura-saucepan-16', 'Aura Sauce Pan 16 (Without Lid)', 2999, 'cookware', 'Aura', 'Tri-ply sauce pan', ['Fast heating aluminium core', '5-year warranty'], '16 cm', null],
  ['aura-saucepan-16-steel', 'Aura Sauce Pan 16 (Steel Lid)', 3450, 'cookware', 'Aura', 'Tri-ply sauce pan with steel lid', ['Fast heating aluminium core', '5-year warranty'], '16 cm', 'Steel lid'],
  ['aura-saucepan-18', 'Aura Sauce Pan 18 (Without Lid)', 3450, 'cookware', 'Aura', 'Tri-ply sauce pan', ['Fast heating aluminium core', '5-year warranty'], '18 cm', null],
  ['aura-saucepan-18-steel', 'Aura Sauce Pan 18 (Steel Lid)', 3950, 'cookware', 'Aura', 'Tri-ply sauce pan with steel lid', ['Fast heating aluminium core', '5-year warranty'], '18 cm', 'Steel lid'],
  ['aura-saucepan-20', 'Aura Sauce Pan 20 (Without Lid)', 3750, 'cookware', 'Aura', 'Tri-ply sauce pan', ['Fast heating aluminium core', '5-year warranty'], '20 cm', null],
  ['aura-saucepan-20-steel', 'Aura Sauce Pan 20 (Steel Lid)', 4450, 'cookware', 'Aura', 'Tri-ply sauce pan with steel lid', ['Fast heating aluminium core', '5-year warranty'], '20 cm', 'Steel lid'],
  ['aura-casserole-18', 'Aura Casserole 18 (Steel Lid)', 3690, 'cookware', 'Aura', 'Tri-ply casserole stewpot', ['Induction safe', '5-year warranty'], '18 cm', 'Steel lid'],
  ['aura-casserole-20', 'Aura Casserole 20 (Steel Lid)', 4150, 'cookware', 'Aura', 'Tri-ply casserole stewpot', ['Induction safe', '5-year warranty'], '20 cm', 'Steel lid'],
  ['aura-casserole-22', 'Aura Casserole 22 (Steel Lid)', 4950, 'cookware', 'Aura', 'Tri-ply casserole stewpot', ['Induction safe', '5-year warranty'], '22 cm', 'Steel lid'],
  ['aura-casserole-24', 'Aura Casserole 24 (Steel Lid)', 5650, 'cookware', 'Aura', 'Tri-ply casserole stewpot', ['Induction safe', '5-year warranty'], '24 cm', 'Steel lid'],
  ['marvel-granite-tawa-280', 'Premium Granite Tawa 280 IB', 1550, 'cookware', 'Marvel', 'Granite non-stick tawa', ['Induction base', 'Uniform heat / faster cooking', 'Use metal spoon without hesitation', 'Requires very little oil', '1-year warranty'], '28 cm', null],
  ['marvel-granite-tawa-250', 'Premium Granite Tawa 250 IB', 1250, 'cookware', 'Marvel', 'Granite non-stick tawa', ['Induction base', 'Uniform heat / faster cooking', 'Use metal spoon without hesitation', 'Requires very little oil', '1-year warranty'], '25 cm', null],
  ['marvel-granite-kadai-260', 'Premium Granite Kadai 260 IB', 2350, 'cookware', 'Marvel', 'Granite non-stick kadai', ['Induction base', 'Uniform heat / faster cooking', 'Strong handles', 'Use metal spoon without hesitation', '1-year warranty'], '26 cm', null],
  ['marvel-granite-kadai-240', 'Premium Granite Kadai 240 IB', 2150, 'cookware', 'Marvel', 'Granite non-stick kadai', ['Induction base', 'Uniform heat / faster cooking', 'Strong handles', 'Use metal spoon without hesitation', '1-year warranty'], '24 cm', null],
  ['marvel-granite-frypan-260', 'Premium Granite Fry Pan 260 IB', 1850, 'cookware', 'Marvel', 'Granite non-stick fry pan', ['Induction base', 'Uniform heat / faster cooking', 'Use metal spoon without hesitation', '1-year warranty'], '26 cm', null],
  ['marvel-granite-frypan-240', 'Premium Granite Fry Pan 240 IB', 1550, 'cookware', 'Marvel', 'Granite non-stick fry pan', ['Induction base', 'Uniform heat / faster cooking', 'Use metal spoon without hesitation', '1-year warranty'], '24 cm', null],
  ['marvel-appachatty-250', 'Non-Stick Appachatty 250', 850, 'cookware', 'Marvel', 'South Indian appam maker', ['Non-stick coating', '1-year warranty'], '25 cm', null],
  ['marvel-appachatty-prime-350', 'Appachatty Prime 350', 950, 'cookware', 'Marvel', 'Premium appam maker', ['Non-stick coating', '1-year warranty'], '35 cm', null],
  ['marvel-pathiri-round', 'Non-Stick Pathiri Tawa Round', 2750, 'cookware', 'Marvel', 'Round pathiri tawa', ['Non-stick surface', '1-year warranty'], null, null],
  ['marvel-pathiri-fold', 'Non-Stick Pathiri Tawa Fold', 2950, 'cookware', 'Marvel', 'Foldable pathiri tawa', ['Non-stick surface', '1-year warranty'], null, null],
  ['marvel-cookware-set-ktf', 'Non-Stick Four Pcs Cookware Set KTF', 3490, 'cookware', 'Marvel', '4-piece KTF cookware set', ['Complete starter set', '1-year warranty'], 'KTF set', null],
  ['marvel-biriyani-3-5', 'Non-Stick Biriyani Pot 3.5Ltr', 2150, 'cookware', 'Marvel', 'Biriyani pot 3.5 litre', ['Non-stick interior', '1-year warranty'], null, '3.5 L'],
  ['marvel-biriyani-5', 'Non-Stick Biriyani Pot 5Ltr', 2650, 'cookware', 'Marvel', 'Biriyani pot 5 litre', ['Non-stick interior', '1-year warranty'], null, '5 L'],
  ['marvel-biriyani-8', 'Non-Stick Biriyani Pot 8Ltr', 2750, 'cookware', 'Marvel', 'Biriyani pot 8 litre', ['Non-stick interior', '1-year warranty'], null, '8 L'],
  ['marvel-biriyani-10', 'Non-Stick Biriyani Pot 10Ltr', 2950, 'cookware', 'Marvel', 'Biriyani pot 10 litre', ['Non-stick interior', '1-year warranty'], null, '10 L'],
  ['ss-pc-3l-ib', 'SS Pressure Cooker 3Ltr IB', 3490, 'appliances', 'Pressure Cooker', 'Stainless steel pressure cooker 3L', ['1-year warranty', 'Induction base'], null, '3 L'],
  ['ss-pc-5l-ib', 'SS Pressure Cooker 5Ltr IB', 3990, 'appliances', 'Pressure Cooker', 'Stainless steel pressure cooker 5L', ['1-year warranty', 'Induction base'], null, '5 L'],
  ['alu-pc-3l', 'ALU Pressure Cooker 3Ltr', 1490, 'appliances', 'Pressure Cooker', 'Aluminium pressure cooker 3L', [], null, '3 L'],
  ['alu-pc-3l-ib', 'ALU Pressure Cooker 3Ltr IB', 1590, 'appliances', 'Pressure Cooker', 'Aluminium pressure cooker 3L induction base', ['Induction base'], null, '3 L'],
  ['alu-pc-5l', 'ALU Pressure Cooker 5Ltr', 1950, 'appliances', 'Pressure Cooker', 'Aluminium pressure cooker 5L', [], null, '5 L'],
  ['alu-pc-5l-ib', 'ALU Pressure Cooker 5Ltr IB', 2150, 'appliances', 'Pressure Cooker', 'Aluminium pressure cooker 5L induction base', ['Induction base'], null, '5 L'],
  ['alu-pc-3l-dripless', 'ALU Pressure Cooker 3Ltr IB Driples', 2150, 'appliances', 'Pressure Cooker', 'Dripless aluminium cooker 3L', ['Dripless lid', 'Induction base'], null, '3 L'],
  ['alu-pc-5l-dripless', 'ALU Pressure Cooker 5Ltr IB Driples', 2490, 'appliances', 'Pressure Cooker', 'Dripless aluminium cooker 5L', ['Dripless lid', 'Induction base'], null, '5 L'],
  ['alu-pc-combo-5x3', 'ALU Pressure Cooker 5x3 Combo Set', 3350, 'appliances', 'Pressure Cooker', '5L and 3L combo pressure cooker set', ['Combo set'], null, '5 L + 3 L'],
  ['stello-1b', 'Stello 1B Single Burner Steel Gas Stove', 1990, 'appliances', 'Stello', 'Single burner stainless steel stove', ['2-year warranty', 'Make in India', 'Brass burner'], '1 burner', null],
  ['stello-2b', 'Stello 2B 2-Burner Steel Gas Stove', 4190, 'appliances', 'Stello', 'Two burner stainless steel stove', ['2-year warranty', 'Make in India', 'Brass burners'], '2 burner', null],
  ['stello-2b-fb', 'Stello 2B FB Full Steel Gas Stove', 4590, 'appliances', 'Stello', 'Full body two burner steel stove', ['2-year warranty', 'Make in India', 'Full steel body'], '2 burner', null],
  ['sparkle-2b', 'Sparkle 2B Glass Top Gas Stove', 6990, 'appliances', 'Sparkle', 'Two burner toughened glass-top stove', ['2-year warranty', 'Make in India', 'Glass top'], '2 burner', null],
  ['sparkle-3b', 'Sparkle 3B Glass Top Gas Stove', 7990, 'appliances', 'Sparkle', 'Three burner toughened glass-top stove', ['2-year warranty', 'Make in India', 'Glass top'], '3 burner', null],
  ['belly-casserole-1500', 'Belly SS Insulated Casserole 1500ml', 1590, 'thermoware', 'Belly', 'Inner-outer stainless steel hot pot', ['Simple functional lid', 'Neutralizes strong odours', 'Corrosion resistant', 'Not for flame or microwave'], null, '1500 ML'],
  ['belly-casserole-2500', 'Belly SS Insulated Casserole 2500ml', 1990, 'thermoware', 'Belly', 'Inner-outer stainless steel hot pot', ['Simple functional lid', 'Neutralizes strong odours', 'Corrosion resistant', 'Not for flame or microwave'], null, '2500 ML'],
  ['belly-casserole-3500', 'Belly SS Insulated Casserole 3500ml', 2650, 'thermoware', 'Belly', 'Inner-outer stainless steel hot pot', ['Simple functional lid', 'Neutralizes strong odours', 'Corrosion resistant', 'Not for flame or microwave'], null, '3500 ML'],
  ['belly-casserole-5000', 'Belly SS Insulated Casserole 5000ml', 3750, 'thermoware', 'Belly', 'Inner-outer stainless steel hot pot', ['Simple functional lid', 'Neutralizes strong odours', 'Corrosion resistant', 'Not for flame or microwave'], null, '5000 ML'],
  ['pearl-casserole-1500', 'Pearl SS Insulated Casserole 1500ml', 1490, 'thermoware', 'Pearl', 'Inner-outer stainless steel hot pot', ['Hot & cool insulation', 'Not for flame or microwave', 'Corrosion resistant'], null, '1500 ML'],
  ['pearl-casserole-2500', 'Pearl SS Insulated Casserole 2500ml', 1750, 'thermoware', 'Pearl', 'Inner-outer stainless steel hot pot', ['Hot & cool insulation', 'Not for flame or microwave', 'Corrosion resistant'], null, '2500 ML'],
  ['pearl-casserole-3500', 'Pearl SS Insulated Casserole 3500ml', 2390, 'thermoware', 'Pearl', 'Inner-outer stainless steel hot pot', ['Hot & cool insulation', 'Not for flame or microwave', 'Corrosion resistant'], null, '3500 ML'],
  ['pearl-casserole-5000', 'Pearl SS Insulated Casserole 5000ml', 3350, 'thermoware', 'Pearl', 'Inner-outer stainless steel hot pot', ['Hot & cool insulation', 'Not for flame or microwave', 'Corrosion resistant'], null, '5000 ML'],
  ['marvel-thermoware-3500', 'Marvel Thermoware Hot Pot 3500', 1090, 'thermoware', 'Marvel', 'Insulated hot pot — keep warm, keep cold', ['BPA free', 'Food grade', 'Keep warm / keep cold'], null, '3500'],
  ['marvel-thermoware-5500', 'Marvel Thermoware Hot Pot 5500', 1250, 'thermoware', 'Marvel', 'Insulated hot pot — keep warm, keep cold', ['BPA free', 'Food grade', 'Keep warm / keep cold'], null, '5500'],
  ['marvel-thermoware-6500', 'Marvel Thermoware Hot Pot 6500', 1590, 'thermoware', 'Marvel', 'Insulated hot pot — keep warm, keep cold', ['BPA free', 'Food grade', 'Keep warm / keep cold'], null, '6500'],
  ['puttu-maker-ss', 'Stainless Steel Puttu Maker', 950, 'tools', 'Kitchen Tools', 'Traditional puttu maker (LMPM)', ['Easy handling', 'No-twist easy fitting', 'Stay-cool handle', 'Induction, ceramic, gas & dishwasher'], null, null],
  ['puttu-maker-chiratta', 'Chiratta Puttu Maker', 490, 'tools', 'Kitchen Tools', 'Coconut-shell style puttu maker (LMCP)', ['Easy handling', 'No-twist easy fitting', 'Stay-cool handle'], null, null],
  ['chop-magic-650', 'Chop Magic Push Chopper 650ml', 690, 'tools', 'Chop Magic', '2-in-1 push chopper with blending blade', ['Easy to push', 'Stylish locking system', 'Extra-sharp SS blades', 'Heavy plastic body'], null, '650 ml'],
  ['chop-magic-1100', 'Chop Magic Push Chopper 1100ml', 790, 'tools', 'Chop Magic', '2-in-1 push chopper with blending blade', ['Easy to push', 'Stylish locking system', 'Extra-sharp SS blades', 'Heavy plastic body'], null, '1100 ml'],
  ['elite-chopper-450', 'Elite Handy Chopper 450ml', 490, 'tools', 'Elite', 'Pull-cord 2-in-1 handy chopper', ['Instant knife cuts', 'Blending attachment', '2-in-1 chopper'], null, '450 ml'],
  ['elite-chopper-750', 'Elite Handy Chopper 750ml', 590, 'tools', 'Elite', 'Pull-cord 2-in-1 handy chopper', ['Instant knife cuts', 'Blending attachment', '2-in-1 chopper'], null, '750 ml'],
  ['ss-saucepan-14', 'Stainless Steel Sauce Pan 14cm', 690, 'tools', 'Kitchen Tools', 'Mirror-finish sauce pan with lid (LMSP14)', ['High-quality stainless steel', 'Strong handle', 'Induction & gas', '1-year warranty'], '14 cm', null],
  ['ss-saucepan-16', 'Stainless Steel Sauce Pan 16cm', 790, 'tools', 'Kitchen Tools', 'Mirror-finish sauce pan with lid (LMSP16)', ['High-quality stainless steel', 'Strong handle', 'Induction & gas', '1-year warranty'], '16 cm', null],
  ['ss-whisk-8', 'SS Pipe Handle Egg Whisk 8"', 129, 'tools', 'Kitchen Tools', 'Stainless steel whisk 8 inch', ['Dishwasher safe'], '8 in', null],
  ['ss-whisk-10', 'SS Pipe Handle Egg Whisk 10"', 149, 'tools', 'Kitchen Tools', 'Stainless steel whisk 10 inch', ['Dishwasher safe'], '10 in', null],
  ['ss-whisk-12', 'SS Pipe Handle Egg Whisk 12"', 169, 'tools', 'Kitchen Tools', 'Stainless steel whisk 12 inch', ['Dishwasher safe'], '12 in', null],
  ['ss-whisk-14', 'SS Pipe Handle Egg Whisk 14"', 186, 'tools', 'Kitchen Tools', 'Stainless steel whisk 14 inch', ['Dishwasher safe'], '14 in', null],
  ['ss-strainer-1', 'Stainless Steel Strainer Size 1', 65, 'tools', 'Kitchen Tools', 'Fine mesh strainer size 1', ['Dishwasher safe'], null, null],
  ['ss-strainer-2', 'Stainless Steel Strainer Size 2', 75, 'tools', 'Kitchen Tools', 'Fine mesh strainer size 2', ['Dishwasher safe'], null, null],
  ['ss-strainer-3', 'Stainless Steel Strainer Size 3', 85, 'tools', 'Kitchen Tools', 'Fine mesh strainer size 3', ['Dishwasher safe'], null, null],
  ['ss-strainer-4', 'Stainless Steel Strainer Size 4', 97, 'tools', 'Kitchen Tools', 'Fine mesh strainer size 4', ['Dishwasher safe'], null, null],
  ['lemon-squeezer-light', 'Lemon Squeezer Light', 290, 'tools', 'Kitchen Tools', 'Lightweight lemon squeezer', [], null, null],
  ['lemon-squeezer-heavy', 'Lemon Squeezer Heavy', 390, 'tools', 'Kitchen Tools', 'Heavy duty lemon squeezer', [], null, null],
  ['lemon-squeezer-premium', 'Lemon Squeezer Premium with Bottle Opener', 490, 'tools', 'Kitchen Tools', 'Premium squeezer with bottle opener', [], null, null],
  ['lunchbox-charmy', 'SS Lunch Box Charmy', 699, 'tools', 'Pearl', 'Stainless steel lunch box Charmy', [], null, null],
  ['lunchbox-aira', 'SS Lunch Box Aira', 799, 'tools', 'Folio', 'Stainless steel lunch box Aira', [], null, null],
  ['scissors-cairo-201', 'Multipurpose Scissors Cairo 201', 390, 'tools', 'Cairo', 'Multipurpose kitchen scissors', [], null, null],
  ['scissors-cairo-502', 'Multipurpose Scissors Cairo 502 with Cover', 490, 'tools', 'Cairo', 'Scissors with protective cover', [], null, null],
  ['scissors-cairo-231', 'Multipurpose Scissors Cairo 231 with Cover & Magnet', 650, 'tools', 'Cairo', 'Scissors with cover and magnet', [], null, null],
  ['lmek-1-5', 'Electric Kettle 1.5L LMEK1.5', 1890, 'appliances', 'Le Mam Appliances', 'Electric kettle 1.5 litre', ['Auto cut-off'], null, '1.5 L'],
  ['lmek-1-8', 'Electric Kettle 1.8L LMEK1.8', 1990, 'appliances', 'Le Mam Appliances', 'Electric kettle 1.8 litre', ['Auto cut-off'], null, '1.8 L'],
  ['lmvf-350', 'Vacuum Flask LMVFK 350ml', 910, 'thermoware', 'Pearl', 'Vacuum flask 350ml', ['Keeps hot 12 hours'], null, '350 ml'],
  ['lmvf-500', 'Vacuum Flask LMVFK 500ml', 990, 'thermoware', 'Pearl', 'Vacuum flask 500ml', ['Keeps hot 12 hours'], null, '500 ml'],
  ['lmvf-750', 'Vacuum Flask LMVFK 750ml', 1450, 'thermoware', 'Pearl', 'Vacuum flask 750ml', ['Keeps hot 12 hours'], null, '750 ml'],
  ['lmvf-1000', 'Vacuum Flask LMVFK 1000ml', 1590, 'thermoware', 'Pearl', 'Vacuum flask 1 litre', ['Keeps hot 12 hours'], null, '1 L'],
  ['lmvb-750', 'Vacuum Bottle LMVB 750ml', 1650, 'thermoware', 'Pearl', 'Vacuum bottle 750ml', [], null, '750 ml'],
];

const skuById = {
  'aura-kadai-22-glass': 'AURA KA 22 GL',
  'aura-kadai-22-steel': 'AURA KA 22 SL',
  'aura-kadai-24-glass': 'AURA KA 24 GL',
  'aura-kadai-24-steel': 'AURA KA 24 SL',
  'aura-kadai-26-glass': 'AURA KA 26 GL',
  'aura-kadai-26-steel': 'AURA KA 26 SL',
  'aura-frypan-22': 'AURA FP 22',
  'aura-frypan-22-steel': 'AURA FP 22 SL',
  'aura-frypan-22-glass': 'AURA FP 22 GL',
  'aura-frypan-24': 'AURA FP 24',
  'aura-frypan-24-steel': 'AURA FP 24 SL',
  'aura-frypan-24-glass': 'AURA FP 24 GL',
  'aura-frypan-26': 'AURA FP 26',
  'aura-frypan-26-steel': 'AURA FP 26 SL',
  'aura-frypan-26-glass': 'AURA FP 26 GL',
  'aura-saucepan-14': 'AURA SP 14',
  'aura-saucepan-14-steel': 'AURA SP 14 SL',
  'aura-saucepan-16': 'AURA SP 16',
  'aura-saucepan-16-steel': 'AURA SP 16 SL',
  'aura-saucepan-18': 'AURA SP 18',
  'aura-saucepan-18-steel': 'AURA SP 18 SL',
  'aura-saucepan-20': 'AURA SP 20',
  'aura-saucepan-20-steel': 'AURA SP 20 SL',
  'aura-casserole-18': 'AURA CS 18 SL',
  'aura-casserole-20': 'AURA CS 20 SL',
  'aura-casserole-22': 'AURA CS 22 SL',
  'aura-casserole-24': 'AURA CS 24 SL',
  'marvel-granite-tawa-280': 'LMTP 280IB',
  'marvel-granite-tawa-250': 'LMTP 250IB',
  'marvel-granite-kadai-260': 'LMFP 260IB KADAI',
  'marvel-granite-kadai-240': 'LMFP 240IB KADAI',
  'marvel-granite-frypan-260': 'LMFP 260IB FP',
  'marvel-granite-frypan-240': 'LMFP 240IB FP',
  'marvel-appachatty-250': 'LMAP 250',
  'marvel-appachatty-prime-350': 'LMAP 350 PRIME',
  'marvel-pathiri-round': 'LMPTRD',
  'marvel-pathiri-fold': 'LMPTSQ1',
  'marvel-cookware-set-ktf': 'LMKTF IB',
  'marvel-biriyani-3-5': 'LMBP 3.5LTR',
  'marvel-biriyani-5': 'LMBP 5LTR',
  'marvel-biriyani-8': 'LMBP 8LTR',
  'marvel-biriyani-10': 'LMBP 10LTR',
  'ss-pc-3l-ib': 'LMSSPC3IB',
  'ss-pc-5l-ib': 'LMSSPC5IB',
  'alu-pc-3l': 'LMALPC3',
  'alu-pc-3l-ib': 'LMALPC3IB',
  'alu-pc-5l': 'LMALPC5',
  'alu-pc-5l-ib': 'LMALPC5IB',
  'alu-pc-3l-dripless': 'LMALPCDL3IB',
  'alu-pc-5l-dripless': 'LMALPCDL5IB',
  'alu-pc-combo-5x3': 'LMALPC53SL',
  'stello-1b': 'STELLO 1B',
  'stello-2b': 'STELLO 2B',
  'stello-2b-fb': 'STELLO 2B FB',
  'sparkle-2b': 'SPARKLE 2B',
  'sparkle-3b': 'SPARKLE 3B',
  'belly-casserole-1500': 'BELLY 1500 ML',
  'belly-casserole-2500': 'BELLY 2500 ML',
  'belly-casserole-3500': 'BELLY 3500 ML',
  'belly-casserole-5000': 'BELLY 5000 ML',
  'pearl-casserole-1500': 'PEARL 1500 ML',
  'pearl-casserole-2500': 'PEARL 2500 ML',
  'pearl-casserole-3500': 'PEARL 3500 ML',
  'pearl-casserole-5000': 'PEARL 5000 ML',
  'marvel-thermoware-3500': 'MARVEL 3500',
  'marvel-thermoware-5500': 'MARVEL 5500',
  'marvel-thermoware-6500': 'MARVEL 6500',
  'puttu-maker-ss': 'LMPM',
  'puttu-maker-chiratta': 'LMCP',
  'chop-magic-650': 'CHOP MAGIC 650',
  'chop-magic-1100': 'CHOP MAGIC 1100',
  'elite-chopper-450': 'ELITE 450',
  'elite-chopper-750': 'ELITE 750',
  'ss-saucepan-14': 'LMSP14',
  'ss-saucepan-16': 'LMSP16',
  'ss-whisk-8': 'WHISK 8',
  'ss-whisk-10': 'WHISK 10',
  'ss-whisk-12': 'WHISK 12',
  'ss-whisk-14': 'WHISK 14',
  'ss-strainer-1': 'STRAINER 1',
  'ss-strainer-2': 'STRAINER 2',
  'ss-strainer-3': 'STRAINER 3',
  'ss-strainer-4': 'STRAINER 4',
  'lemon-squeezer-light': 'SQUEEZER LIGHT',
  'lemon-squeezer-heavy': 'SQUEEZER HEAVY',
  'lemon-squeezer-premium': 'SQUEEZER PREMIUM',
  'lunchbox-charmy': 'CHARMY',
  'lunchbox-aira': 'AIRA',
  'scissors-cairo-201': 'CAIRO 201',
  'scissors-cairo-502': 'CAIRO 502',
  'scissors-cairo-231': 'CAIRO 231',
  'lmek-1-5': 'LMEK 1.5',
  'lmek-1-8': 'LMEK 1.8',
  'lmvf-350': 'LMVFK 350',
  'lmvf-500': 'LMVFK 500',
  'lmvf-750': 'LMVFK 750',
  'lmvf-1000': 'LMVFK 1000',
  'lmvb-750': 'LMVB 750',
  'aura-kadai-frypan': 'AURA STARTER',
};

function catalogBadge(id, warrantyYears) {
  if (id === 'aura-kadai-frypan' || id === 'marvel-cookware-set-ktf') return 'Seasonal';
  if (warrantyYears === 5) return '5-Year Warranty';
  if (warrantyYears === 2) return '2-Year Warranty';
  if (warrantyYears === 1) return '1-Year Warranty';
  return undefined;
}

function classify(id, series, home) {
  let category = 'tools';
  let material = 'Stainless Steel';
  let warrantyYears = 1;
  let compatibility = ['Dishwasher'];
  let construction;
  let homeCollection = home;

  if (id.startsWith('aura-')) {
    category = 'tri-ply';
    material = 'Tri-Ply';
    warrantyYears = 5;
    compatibility = ['Induction', 'Gas', 'Ceramic', 'Dishwasher'];
    construction = ['304 Stainless Steel interior', 'Mid-core Aluminium', '430 Stainless Steel exterior'];
    homeCollection = 'cookware';
  } else if (id.startsWith('marvel-') && !id.includes('thermoware')) {
    category = 'marvel';
    material = 'Non-Stick Granite';
    warrantyYears = 1;
    compatibility = id.includes('pathiri') || id.includes('appachatty')
      ? ['Gas', 'Ceramic']
      : ['Induction', 'Gas', 'Ceramic'];
    homeCollection = 'cookware';
  } else if (id.includes('-pc-') || id.startsWith('stello-') || id.startsWith('sparkle-')) {
    category = 'cookers-stoves';
    homeCollection = 'appliances';
    if (id.startsWith('alu-')) {
      material = 'Aluminium';
      warrantyYears = 1;
      compatibility = id.includes('ib') || id.includes('dripless') || id.includes('combo')
        ? ['Gas', 'Induction']
        : ['Gas'];
    } else if (id.startsWith('ss-pc')) {
      material = 'Stainless Steel';
      warrantyYears = 1;
      compatibility = ['Induction', 'Gas', 'Dishwasher'];
    } else {
      material = 'Stainless Steel';
      warrantyYears = 2;
      compatibility = ['Gas'];
    }
  } else if (
    id.startsWith('belly-') ||
    id.startsWith('pearl-') ||
    id.includes('thermoware') ||
    id.startsWith('lmvf') ||
    id.startsWith('lmvb')
  ) {
    category = 'thermoware';
    homeCollection = 'thermoware';
    material = 'Stainless Steel';
    warrantyYears = 1;
    compatibility = ['Dishwasher'];
  } else if (id.startsWith('lmek-')) {
    category = 'thermoware';
    homeCollection = 'appliances';
    material = 'Stainless Steel';
    warrantyYears = 1;
    compatibility = [];
  } else {
    category = 'tools';
    homeCollection = 'tools';
    if (id.startsWith('lemon-')) material = 'Aluminium';
    if (id.startsWith('puttu-') || id.startsWith('ss-saucepan')) {
      compatibility = ['Induction', 'Gas', 'Ceramic', 'Dishwasher'];
    }
    warrantyYears = id.startsWith('ss-whisk') || id.startsWith('ss-strainer') || id.startsWith('lemon-') ? 0 : 1;
    compatibility = ['Dishwasher'];
  }

  return { category, material, warrantyYears, compatibility, construction, homeCollection };
}

const dir = path.join(__dirname, '../assets/products');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.jpg'));

const mapped = products.map((row) => {
  const [id, name, mrp, home, series, description, features, size, capacity] = row;
  const extra = classify(id, series, home);
  const obj = {
    id,
    name,
    series,
    sku: skuById[id] || id.toUpperCase(),
    catalogTag: extra.category,
    ...extra,
    mrp,
    features,
    description,
    accent: extra.material === 'Tri-Ply' ? '#6B3E2A' : extra.material === 'Non-Stick Granite' ? '#3D3A38' : '#7A6A5C',
    icon: 'ellipse-outline',
  };
  if (size) obj.size = size;
  if (capacity) obj.capacity = capacity;
  const badge = catalogBadge(id, extra.warrantyYears);
  if (badge) obj.badge = badge;
  return obj;
});

// Seasonal Aura starter set — brochure combo image
mapped.push({
  id: 'aura-kadai-frypan',
  name: 'Aura Starter Set (Kadai + Fry Pan)',
  series: 'Aura',
  category: 'tri-ply',
  homeCollection: 'cookware',
  material: 'Tri-Ply',
  mrp: 7680,
  salePrice: 6490,
  warrantyYears: 5,
  compatibility: ['Induction', 'Gas', 'Ceramic', 'Dishwasher'],
  sku: 'AURA STARTER',
  catalogTag: 'tri-ply',
  construction: ['304 Stainless Steel interior', 'Mid-core Aluminium', '430 Stainless Steel exterior'],
  features: ['Seasonal savings bundle', '5-year Aura warranty', 'Matched handles'],
  description: 'Seasonal Aura Starter Set pairing a tri-ply kadai and fry pan — food-first 304 interiors with steel-mark authentication.',
  badge: 'Seasonal',
  accent: '#A35A2A',
  icon: 'layers-outline',
});

function esc(s) {
  return JSON.stringify(s);
}

let ts = `export type Material = 'Tri-Ply' | 'Non-Stick Granite' | 'Aluminium' | 'Stainless Steel';
export type CategorySlug = 'tri-ply' | 'marvel' | 'cookers-stoves' | 'thermoware' | 'tools';
export type HomeCollection = 'cookware' | 'appliances' | 'thermoware' | 'tools';
export type Compatibility = 'Induction' | 'Gas' | 'Ceramic' | 'Dishwasher';
export type Badge = '1-Year Warranty' | '2-Year Warranty' | '5-Year Warranty' | 'Seasonal';

export type Product = {
  id: string;
  name: string;
  series: string;
  sku: string;
  catalogTag: CategorySlug;
  category: CategorySlug;
  homeCollection: HomeCollection;
  material: Material;
  mrp: number;
  salePrice?: number;
  warrantyYears: 0 | 1 | 2 | 5;
  compatibility: Compatibility[];
  size?: string;
  capacity?: string;
  features: string[];
  construction?: string[];
  description: string;
  badge?: Badge;
  accent: string;
  icon: string;
};

export const categories: { slug: CategorySlug; title: string; subtitle: string }[] = [
  { slug: 'tri-ply', title: 'Tri-Ply Stainless', subtitle: 'Aura 3-layer cookware' },
  { slug: 'marvel', title: 'Marvel Series', subtitle: 'Non-stick granite' },
  { slug: 'cookers-stoves', title: 'Cookers & Stoves', subtitle: 'Pressure cookers & hobs' },
  { slug: 'thermoware', title: 'Insulated & Flasks', subtitle: 'Keep meals hot' },
  { slug: 'tools', title: 'Tools & Cutlery', subtitle: 'Everyday kitchen helpers' },
];

export const homeCollections: { slug: HomeCollection; title: string; icon: string }[] = [
  { slug: 'cookware', title: 'Cookware', icon: 'restaurant-outline' },
  { slug: 'appliances', title: 'Appliances', icon: 'flame-outline' },
  { slug: 'thermoware', title: 'Thermoware', icon: 'cube-outline' },
  { slug: 'tools', title: 'Tools', icon: 'cut-outline' },
];

export const catalogTags: { id: string; label: string; match: (p: Product) => boolean }[] = [
  { id: 'aura', label: 'Aura', match: (p) => p.series === 'Aura' },
  { id: 'marvel', label: 'Marvel', match: (p) => p.series === 'Marvel' },
  { id: 'cookers', label: 'Cookers', match: (p) => p.series === 'Pressure Cooker' },
  { id: 'stoves', label: 'Stoves', match: (p) => p.series === 'Stello' || p.series === 'Sparkle' },
  { id: 'belly', label: 'Belly', match: (p) => p.series === 'Belly' },
  { id: 'pearl', label: 'Pearl', match: (p) => p.series === 'Pearl' },
  { id: 'choppers', label: 'Choppers', match: (p) => p.series === 'Chop Magic' || p.series === 'Elite' },
  { id: 'tools', label: 'Tools', match: (p) => p.category === 'tools' && p.series !== 'Chop Magic' && p.series !== 'Elite' },
];

export const products: Product[] = ${JSON.stringify(mapped, null, 2)};

export function formatInr(value: number) {
  return \`₹\${value.toLocaleString('en-IN')}\`;
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function priceOf(product: Product) {
  return product.salePrice ?? product.mrp;
}
`;

fs.writeFileSync(path.join(__dirname, 'products.ts'), ts);

const ids = mapped.map((p) => p.id);
const imageIds = ids.filter((id) => files.includes(`${id}.jpg`));
const fallback = files.includes('fallback-default.jpg') ? 'fallback-default.jpg' : files[0];

let img = `const images: Record<string, number> = {\n`;
for (const id of imageIds) {
  img += `  '${id}': require('../assets/products/${id}.jpg'),\n`;
}
img += `};

const fallback = require('../assets/products/${fallback}');

export function productImage(id: string) {
  return images[id] ?? fallback;
}
`;
fs.writeFileSync(path.join(__dirname, 'productImages.ts'), img);

console.log('wrote', mapped.length, 'products', imageIds.length, 'images');
