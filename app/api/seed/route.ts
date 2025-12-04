import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '../../../models/products';


const products = [
    {
        "name": "The Slim Fit Travel Chino",
        "description": "Built for the modern hustle. Features 4-way stretch fabric that moves with you, wrinkle-resistance for all-day crispness.",
        "category": "trousers",
        "url": "https://minus1lifestyle.com/collections/olive-green-chinos-mens/products/daylong-chino-slim-tailored-fit-in-stained-olive",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_1",
        "path": "path1"
    },
    {
        "name": "Power-Stretch Pants",
        "description": "Proprietary Power-Stretch technology retains shape after days of wear. Features a shirt gripper inside the waistband.",
        "category": "trousers",
        "url": "https://pantproject.com/products/deep-black-slim-fit-power-stretch-pants",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_2",
        "path": "path1"
    },
    {
        "name": "Elite trousers",
        "description": "Wrinkle-resistant tri-blend with a concealed flex-band. Oxford Blue offers a vibrant, fresh alternative to standard navy.",
        "category": "trousers",
        "url": "https://www.aristobrat.in/products/elite-trousers-in-oxford-blue",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_3",
        "path": "path1"
    },
    {
        "name": "Stride Comfort Fit Stretch Chinos",
        "description": "Known for their mastery of white. These are stain-repellent treated. Note: Brand specializes in White.",
        "category": "trousers",
        "url": "https://kingdomofwhite.com/collections/all/products/stride?_pos=3&_fid=38bea65a5&_ss=c",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_4",
        "path": "path1"
    },
    {
        "name": "Stretch Chinos",
        "description": "The best value-for-money option. High stretch, durable twill weave.",
        "category": "trousers",
        "url": "https://www.snitch.com/men-trousers/slim-fit-chino-stretch-chinos-4msc4028-03/8693014462626/buy",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_5",
        "path": "path1"
    },
    {
        "name": "Custom City Chinos",
        "description": "Fully customizable. The Tobacco color is a rich, warm brown that exudes 'Old Money' confidence.",
        "category": "trousers",
        "url": "https://www.bombayshirts.com/products/bsc-sierra-corduroy-pleated-chinos-beige#modal",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_6",
        "path": "path1"
    },
    {
        "name": "Coast Relaxed Linen Pants",
        "description": "From the white-shirt specialists comes the ultimate resort trouser. Features a concealed drawstring for a clean front look but jogger-level comfort. The fabric is treated to be softer and less prone to harsh wrinkling than standard linen.",
        "category": "trousers",
        "url": "https://kingdomofwhite.com/products/relaxed-linen-pants-coast",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_7",
        "path": "path2"
    },
    {
        "name": "Classic Pleated Chinos",
        "description": "Single-pleat silhouette for extra drape. Cement is a sophisticated off-white grey.",
        "category": "trousers",
        "url": "https://www.jj56.in/products/chinos-cement",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_8",
        "path": "path2"
    },
    {
        "name": "Textured Linen Drawstring Trouser",
        "description": "Instead of a printed check, Fabindia offers a woven texture that provides visual depth. The fabric has a natural slub character that elevates it above basic solids. Includes a drawstring for a casual, artisanal vibe.",
        "category": "trousers",
        "url": "https://www.fabindia.com/natural-linen-full-length-regular-pant-20179414",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_9",
        "path": "path2"
    },
    {
        "name": "Viraam Relaxed trousers",
        "description": "Features subtle hand-block print details on the hem or pocket.",
        "category": "trousers",
        "url": "https://www.farak.co/collections/pants",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_10",
        "path": "path2"
    },
    {
        "name": "Glade Linen Trouser",
        "description": "Rare Rabbit is known for bold colors. This peach/coral tone is for the confident resort-goer.",
        "category": "trousers",
        "url": "https://thehouseofrare.com/products/glade-1-mens-trouser-beige",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_11",
        "path": "path2"
    },
    {
        "name": "Statement Chino Joggers",
        "description": "Damensch creates high-tech comfort wear. Their 'Statement' line uses a premium cotton blend that has the 4-way stretch of a jogger but the matte finish of a chino. Looks smart, feels like sweatpants.",
        "category": "trousers",
        "url": "https://kingdomofwhite.com/products/elasticated-drawstring-joggers-voyager",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_12",
        "path": "path2"
    },
    {
        "name": "Comotel Satin Stretch Formal Trouser",
        "description": "A satin-finish stretch trouser that mimics the sheen of fine wool. The fabric has a subtle luster that catches low light, making it perfect for cocktail hours or high-end dinners.",
        "category": "trousers",
        "url": "https://thehouseofrare.com/products/comotel-mens-trouser-teal",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_13",
        "path": "path3"
    },
    {
        "name": "Classic Chinos",
        "description": "Deep rich brown. High contrast 'Old Money' evening look.",
        "category": "trousers",
        "url": "https://www.jj56.in/products/chinos-coffee",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_14",
        "path": "path3"
    },
    {
        "name": "Elite trousers",
        "description": "Jet black, wrinkle-resistant, shirt gripper waistband.",
        "category": "trousers",
        "url": "https://www.aristobrat.in/products/elite-trousers-in-oatmeal",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_15",
        "path": "path3"
    },
    {
        "name": "Comotel Satin Stretch Trouser",
        "description": "Subtle satin finish gives a dressy sheen suitable for cocktail bars.",
        "category": "trousers",
        "url": "https://thehouseofrare.com/products/comotel-mens-trouser-grey",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_16",
        "path": "path3"
    },
    {
        "name": "Pleated Formal trousers",
        "description": "Unbeatable entry point for the pleated trend. Sharp crease, clean drape.",
        "category": "trousers",
        "url": "https://www.snitch.com/men-trousers/regular-fit-stretch-self-design-trousers-4msr5320-01/8736894091426/buy",
        "image": "https://placehold.co/600x400",
        "cloudinaryId": "placeholder_id_17",
        "path": "path3"
    },
    
        {
            "name": "Pure Linen Regular Collar Shirt (White)",
            "description": "4.5/5 comfort & durability in 150+ reviews. Made with 100% pure European flax linen processed through proprietary Linius process for zero-shrinkage and superior hand-feel. Features antibacterial, hypoallergenic, breathable, and eco-friendly properties. Perfect for daily formal and casual wear.",
            "category": "linenshirt",
            "url": "https://linentrail.com/collections/mens-shirts/products/monarc-pure-linen-spread-collar-full-sleeve-shirt-white?_pos=2&_fid=220c03f57&_ss=c&variant=41945563431009",
            "image": "https://linentrail.com/cdn/shop/files/1_69ff40c0-e9d9-4a0e-8419-7b1c9f2e4a1d.jpg",
            "cloudinaryId": "placeholder_ls_1",
            "path": "path1"
        },
        {
            "name": "Pure Linen Mandarin Collar Shirt (Misty Lilac)",
            "description": "4.6/5 breathability & easy-care. Mandarin collar design with excellent breathability and moisture-wicking properties. 100% pure linen with 44 LEA pre-shrunk fabric ensuring perfect fit and comfort. Bestseller with over 763+ reviews praising its softness and all-day wearability.",
            "category": "linenshirt",
            "url": "https://linentrail.com/products/trevor-half-placket-pure-linen-full-sleeve-shirt-misty-lilac?_pos=21&_sid=14e222ca8&_ss=r",
            "image": "https://linentrail.com/cdn/shop/files/1_4e7d0e1e-8b9e-4e5f-9e4e-4e7d0e1e8b9e.jpg",
            "cloudinaryId": "placeholder_ls_2",
            "path": "path1"
        },
        {
            "name": "Pure Linen Band Collar Shirt (Natural White)",
            "description": "Praised for 'value for money' and 'hot-weather comfort'. 100% pure linen with Chinese/band collar design, smart fit, and liberty cut hemline. Crafted for maximum breathability in warm climates with moisture-wicking and hypoallergenic properties. Perfect for casual daily wear.",
            "category": "linenshirt",
            "url": "https://ramrajcotton.in/products/men-pure-linen-chinese-collar-white-shirt-5544",
            "image": "https://ramrajcotton.in/cdn/shop/files/5544.jpg",
            "cloudinaryId": "placeholder_ls_3",
            "path": "path1"
        },
        {
            "name": "Linen-Cotton Blend Regular Collar Shirt (Light Blue)",
            "description": "4.6/5 blend that resists wrinkles. Premium linen-cotton blend offering easy maintenance, enhanced durability, and wrinkle resistance. Smart fit design with classic collar perfect for daily office and casual use. Combines breathability of linen with softness of cotton.",
            "category": "linenshirt",
            "url": "https://ramrajcotton.in/collections/linen-cotton-colour-shirts/products/men-linen-cotton-shirt-blue-lf4?_pos=3&_fid=f4443d3c0&_ss=c",
            "image": "https://ramrajcotton.in/cdn/shop/files/linen-cotton-lightblue.jpg",
            "cloudinaryId": "placeholder_ls_4",
            "path": "path1"
        },
        {
            "name": "Soft-Finish Round Neck Shirt (Stone Grey)",
            "description": "'Softest linen' with multiple repeat orders. Premium soft-finish pure linen with round neck design. Rated 4.7/5 for exceptional comfort and perfect fit by customers who report multiple repeat purchases. Made with natural sustainable linen fabric.",
            "category": "linenshirt",
            "url": "https://www.creaturesofhabit.in/products/the-linen-shirt-mens-slate-grey",
            "image": "https://www.creaturesofhabit.in/cdn/shop/products/stonegrey-roundneck.jpg",
            "cloudinaryId": "placeholder_ls_5",
            "path": "path1"
        },
        {
            "name": "Soft-Finish Regular Collar Shirt (Pink)",
            "description": "4.7/5 for comfort & fit. Soft-finish pure linen with regular collar design. Highest rated in the collection for all-day comfort and impeccable fit. Features premium fabric quality with sustainable and eco-friendly linen construction.",
            "category": "linenshirt",
            "url": "https://www.creaturesofhabit.in/products/the-linen-shirt-vintage-pink",
            "image": "https://www.creaturesofhabit.in/cdn/shop/products/white-regular-collar.jpg",
            "cloudinaryId": "placeholder_ls_6",
            "path": "path1"
        },
        {
            "name": "European Flax Regular Collar Shirt (Off-White)",
            "description": "Top seller, premium feel, 4.4/5. European Flax linen from Aditya Birla Group with over 60 years of linen expertise. Sourced from premium French and Belgian flax fibers for superior quality, breathability, and durability. Contemporary fit with spread collar.",
            "category": "linenshirt",
            "url": "https://www.linenclub.com/linen-club-mens-pure-linen-off-white-solid-contemporary-fit-full-sleeve-casual-shirt-lcsfsdn020096",
            "image": "https://www.linenclub.com/media/catalog/product/l/c/lcsfsdn020096_1.jpg",
            "cloudinaryId": "placeholder_ls_7",
            "path": "path1"
        },
        {
            "name": "Patterned Pure Linen Shirt (Navy Checks)",
            "description": "High user ratings for style & cooling effect. Patterned pure linen with navy check design combining modern aesthetics with breathability. Perfect for hot weather comfort while maintaining a stylish appearance. European quality fabric.",
            "category": "linenshirt",
            "url": "https://www.linenclub.com/cavallo-by-linen-club-mens-blended-linen-navy-blue-checked-contemporary-fit-full-sleeve-casual-shirt-casfck8039454",
            "image": "https://www.linenclub.com/media/catalog/product/navy-checks.jpg",
            "cloudinaryId": "placeholder_ls_8",
            "path": "path1"
        },
        {
            "name": "Slim-Fit Pure Linen Formal Shirt (White)",
            "description": "4.3/5 for tailored fit & fabric quality. Premium linen shirt with slim-fit design and spread collar. Bio-washed for extra comfort. Made with 70% cotton 30% linen blend offering perfect balance of structure and breathability. Ideal for office and formal occasions.",
            "category": "linenshirt",
            "url": "https://theformalclub.in/products/cedar-pure-linen-full-sleeves-shirt-in-snow?_pos=1&_sid=3f12d24f9&_ss=r",
            "image": "https://theformalclub.in/cdn/shop/files/white-slim-fit.jpg",
            "cloudinaryId": "placeholder_ls_9",
            "path": "path1"
        },
        {
            "name": "Regular-Fit Pure Linen Casual Shirt (Powder Blue)",
            "description": "Reliable daily pick at ₹2,200. Regular-fit casual linen shirt with natural coconut shell buttons. Premium fabric quality with sustainable elegant detailing. Offers great value for everyday wear with excellent breathability and comfort.",
            "category": "linenshirt",
            "url": "https://theformalclub.in/products/breeze-linen-shirt-in-powder-blue",
            "image": "https://theformalclub.in/cdn/shop/files/lightgrey-regular.jpg",
            "cloudinaryId": "placeholder_ls_10",
            "path": "path1"
        },
        {
            "name": "Premium Linen Regular Collar Shirt (Off-White)",
            "description": "Lauded for international quality & fit. 100% premium European linen (flax) with elegant luster and crisp feel. Processed to reduce wrinkling while maintaining natural texture. Features excellent moisture absorption and breathability. Priced at ₹2,990.",
            "category": "linenshirt",
            "url": "https://www.uniqlo.com/in/en/products/E455957-000?colorCode=COL30&sizeCode=SMA004",
            "image": "https://www.uniqlo.com/in/en/products/E455957-000/00/1.jpg",
            "cloudinaryId": "placeholder_ls_11",
            "path": "path1"
        },
        {
            "name": "Premium Linen Striped Shirt (Blue Stripes)",
            "description": "Summer essential with 4.2/5 comfort. Premium linen with blue stripes featuring excellent moisture absorption and quick-dry properties. Made from 100% European flax with refined styling. Perfect for daily summer wear combining comfort with sophistication.",
            "category": "linenshirt",
            "url": "https://www.uniqlo.com/in/en/products/E474506-000?colorCode=COL64&sizeCode=SMA004",
            "image": "https://www.uniqlo.com/in/en/products/premium-linen-striped.jpg",
            "cloudinaryId": "placeholder_ls_12",
            "path": "path1"
        },
        {
            "name": "Pure Linen Regular Collar Shirt (Dusty Pink)",
            "description": "'Eco-friendly, soft' with 4.1/5 rating. 100% pure linen in dusty pink color with regular fit design. Sustainable natural fabric that's gentle on skin and planet. Features breathable construction ideal for warm weather. Priced at ₹3,490.",
            "category": "linenshirt",
            "url": "https://cottonworld.net/collections/100-linen-shirts/products/m-shirts-50020-21444-pink",
            "image": "https://cottonworld.net/cdn/shop/products/dustypink-linen.jpg",
            "cloudinaryId": "placeholder_ls_13",
            "path": "path1"
        },
        {
            "name": "Men's Brown 100% Linen Regular Fit Shirt (Brown)",
            "description": "'Wrinkle-resistant' for busy users. Linen-cotton blend casual shirt in beige with regular fit. Low-maintenance fabric perfect for active lifestyles combining ease of care with comfort. Easy-care properties make it ideal for daily wear. Priced at ₹1,990.",
            "category": "linenshirt",
            "url": "https://cottonworld.net/collections/mens-shirts/products/m-shirts-50020-21445-brown",
            "image": "https://cottonworld.net/cdn/shop/products/beige-blend.jpg",
            "cloudinaryId": "placeholder_ls_14",
            "path": "path1"
        },
        {
            "name": "Handwoven Pure Linen Regular Collar (Natural Beige)",
            "description": "Artisan weave, 4.2/5 cooling comfort. Handwoven pure linen with artisan craftsmanship using traditional Indian weaving techniques. Excellent breathability for hot weather with natural beige color. Premium quality priced between ₹2,499-2,999.",
            "category": "linenshirt",
            "url": "https://www.fabindia.com/natural-linen-blend-woven-shirt-20194916",
            "image": "https://www.fabindia.com/media/catalog/product/beige-handwoven-linen.jpg",
            "cloudinaryId": "placeholder_ls_15",
            "path": "path2"
        },
        {
            "name": "Light Blue Linen Blend Slim Fit Shirt",
            "description": "Breathable prints, 4.0/5 reviews praising style. Slim-fit printed linen shirt in olive green combining seasonal style with comfort. Features unique artisanal prints with breathable construction perfect for warm weather styling.",
            "category": "linenshirt",
            "url": "https://www.fabindia.com/light-blue-linen-blend-slim-fit-shirt-20229289",
            "image": "https://www.fabindia.com/media/catalog/product/olive-printed-linen.jpg",
            "cloudinaryId": "placeholder_ls_16",
            "path": "path2"
        },
        {
            "name": "European Flax Mandarin Collar Shirt (Ivory)",
            "description": "Minimalist, 4.3/5 for lightness & packaging. European Flax linen with mandarin collar and GOTS-certified sustainable fabric. Ultra-light construction for summer with biodegradable natural fibers. Premium quality priced at ₹5,999.",
            "category": "linenshirt",
            "url": "https://saphed.com/products/olive-co-linen-mens-band-collar-shirt?variant=49800084717879",
            "image": "https://saphed.com/cdn/shop/products/ivory-mandarin-collar.jpg",
            "cloudinaryId": "placeholder_ls_17",
            "path": "path2"
        },
        {
            "name": "Kai Linen Men's Oxford Shirt – Slim Fit",
            "description": "Sustainable, 4.1/5 for drape & feel. Pure linen in forest green with regular collar design. Eco-friendly with excellent drape made from biodegradable European flax fiber. Perfect for warm weather with natural cooling properties. Priced at ₹5,999.",
            "category": "linenshirt",
            "url": "https://saphed.com/products/safari-linen-mens-oxford-shirt-slim-fit?variant=50426785005879",
            "image": "https://saphed.com/cdn/shop/products/forestgreen-regular.jpg",
            "cloudinaryId": "placeholder_ls_18",
            "path": "path2"
        },
        {
            "name": "Premium Linen Long Sleeve Shirt (White)",
            "description": "Quick-dry, 4.4/5 for summer use. Premium linen long sleeve with advanced quick-dry technology and excellent moisture absorption. Made from 100% European flax for maximum breathability perfect for hot climates. Priced at ₹2,990.",
            "category": "linenshirt",
            "url": "https://www.uniqlo.com/in/en/products/E455957-000?colorCode=COL00&sizeCode=SMA004",
            "image": "https://www.uniqlo.com/in/en/products/E455957-000/00/1.jpg",
            "cloudinaryId": "placeholder_ls_19",
            "path": "path2"
        },
        {
            "name": "Premium Linen Striped Long Sleeve Shirt (Blue)",
            "description": "Excellent airflow, 4.2/5. Premium linen with stripes and long sleeves designed for maximum breathability with moisture-wicking properties. Features perfect ventilation for summer with elegant European linen. Priced at ₹2,990.",
            "category": "linenshirt",
            "url": "https://www.uniqlo.com/in/en/products/E474506-000?colorCode=COL64&sizeCode=SMA004",
            "image": "https://www.uniqlo.com/in/en/products/premium-linen-striped-ls.jpg",
            "cloudinaryId": "placeholder_ls_20",
            "path": "path2"
        },
        {
            "name": "Brown Textured Irish Linen Shirt",
            "description": "'Breathable, travel-friendly,' 4.0/5 reviews. Relaxed-fit pure linen ideal for travel and warm-weather comfort with lightweight natural texture. Perfect vacation essential with excellent breathability. Priced at ₹2,299.",
            "category": "linenshirt",
            "url": "https://www.5feet11.com/collections/linen-shirts/products/brown-textured-irish-linen-shirt",
            "image": "https://www.5feet11.com/cdn/shop/products/sand-relaxed-linen.jpg",
            "cloudinaryId": "placeholder_ls_21",
            "path": "path2"
        },
        {
            "name": "Sky Blue Linen Shirt",
            "description": "Casual staple, 4.1/5. Pure linen casual shirt in sky blue with spread collar and relaxed fit. Perfect for seasonal everyday wear with natural breathability and comfortable construction. Priced at ₹2,299.",
            "category": "linenshirt",
            "url": "https://www.5feet11.com/collections/linen-shirts/products/sky-blue-linen-shirt",
            "image": "https://www.5feet11.com/cdn/shop/products/skyblue-linen-shirt.jpg",
            "cloudinaryId": "placeholder_ls_22",
            "path": "path2"
        },
        {
            "name": "Men's Natural Cotton Linen Band Collar Regular Fit Shirt",
            "description": "Lightweight, 4.0/5 for summer comfort. Linen blend in pastel yellow specifically designed for summer season with light fabric and excellent cooling properties. Regular fit construction perfect for hot weather. Priced at ₹3,290.",
            "category": "linenshirt",
            "url": "https://cottonworld.net/collections/men-linen-shirts/products/m-shirts-16731-21089-natural",
            "image": "https://cottonworld.net/cdn/shop/products/yellow-summer-linen.jpg",
            "cloudinaryId": "placeholder_ls_23",
            "path": "path2"
        },
        {
            "name": "Cosmic Latte Linen Shirt",
            "description": "'Best shirt ever,' 4.6/5 premium feel. Premium Belgian Flax linen with mandarin collar featuring exceptional quality and craftsmanship. Made from biodegradable sustainable fiber with 'Rajan' signature detailing. Priced at ₹4,990.",
            "category": "linenshirt",
            "url": "https://www.andamen.com/collections/all-shirts/products/cosmic-latte-linen-shirt",
            "image": "https://www.andamen.com/cdn/shop/products/slategrey-mandarin-flax.jpg",
            "cloudinaryId": "placeholder_ls_24",
            "path": "path3"
        },
        {
            "name": "Raw Umber Shirt",
            "description": "Signature contrast trim, 4.5/5 quality. Premium Belgian Flax with distinctive contrast piping at inner neckband. Timeless investment piece with Rajan embroidery and superior fabric quality. Priced at ₹4,990.",
            "category": "linenshirt",
            "url": "https://www.andamen.com/collections/all-shirts/products/raw-umber-shirt?_pos=10&_fid=7fafe5cb2&_ss=c",
            "image": "https://www.andamen.com/cdn/shop/products/salt-shirt-contrast.jpg",
            "cloudinaryId": "placeholder_ls_25",
            "path": "path3"
        },
        {
            "name": "GOTS Organic Mandarin Shoulder-Button Shirt (Ice Blue)",
            "description": "'Organic linen perfection,' 4.7/5. GOTS-certified 100% organic linen with unique shoulder-button design. Premium sustainable investment with ethical dye processes. Made in India with environmentally conscious production. Priced at ₹3,099.",
            "category": "linenshirt",
            "url": "https://www.primalgray.com/products/side-neck-button-shirt-iceblue",
            "image": "https://www.primalgray.com/cdn/shop/products/iceblue-shoulder-button.jpg",
            "cloudinaryId": "placeholder_ls_26",
            "path": "path3"
        },
        {
            "name": "Raw Umber Shirt",
            "description": "'Sustainable & stylish,' 4.5/5. GOTS-certified organic linen oversize panel shirt with modern design. Premium sustainable materials with environmentally conscious fashion. Made in India with ethical production practices.",
            "category": "linenshirt",
            "url": "https://www.primalgray.com/products/oversize-2-colour-shirt-duskypink",
            "image": "https://www.primalgray.com/cdn/shop/products/duskypink-oversize-panel.jpg",
            "cloudinaryId": "placeholder_ls_27",
            "path": "path3"
        },
        {
            "name": "Pure Irish Linen Regular Collar Shirt (Natural Beige)",
            "description": "'Excellent fit & feel,' 4.4/5. 100% Pure Irish linen with regular collar and signature contrast detailing. Premium quality fabric with exceptional fit and smart casual versatile design. Priced between ₹1,549-2,000.",
            "category": "linenshirt",
            "url": "https://www.myntra.com/symbol-premium",
            "image": "https://assets.myntassets.com/symbol-premium-irish-linen-beige.jpg",
            "cloudinaryId": "placeholder_ls_28",
            "path": "path3"
        },
        {
            "name": "Pure Irish Linen Button-Down Collar Shirt (White)",
            "description": "'Value at ₹2,000,' 4.2/5. Pure Irish linen button-down collar shirt with premium quality and excellent value proposition. Features timeless design with contrast detailing and regular fit construction.",
            "category": "linenshirt",
            "url": "https://www.myntra.com/symbol-premium",
            "image": "https://assets.myntassets.com/symbol-premium-white-buttondown.jpg",
            "cloudinaryId": "placeholder_ls_29",
            "path": "path3"
        },
        {
            "name": "Premium European Flax Spread Collar Shirt (Ivory)",
            "description": "'Timeless elegance,' 4.3/5. Premium European Flax with spread collar from Aditya Birla Group. Over 60 years of linen expertise with timeless design for long-term wardrobe investment. Priced between ₹3,699-3,999.",
            "category": "linenshirt",
            "url": "https://www.linenclub.com/collections/linen-classic",
            "image": "https://www.linenclub.com/media/catalog/product/ivory-spread-collar.jpg",
            "cloudinaryId": "placeholder_ls_30",
            "path": "path3"
        },
        {
            "name": "Nawab Shirt - Light BlueClassic Shirt (Mint)",
            "description": "100% linen with red star buttons, 4.3/5 premium craftsmanship. Made to work across seasons with signature red Nico logo embroidery and distinctive button detailing. ₹5,500",
            "category": "linenshirt",
            "url": "https://www.nicobar.com/collections/shirt/products/nawab-shirt-light-blue-1?_pos=5&_fid=3e8ff92da&_ss=c",
            "image": "https://placehold.co/600x400",
            "cloudinaryId": "placeholder_ls_31",
            "path": "path3"
        },
        {
            "name": "Classic Shirt (Watermelon)",
            "description": "100% linen, breathable and timeless, 4.2/5 quality. Features green Nico logo embroidery, red star buttons, and excellent trans-seasonal versatility. ₹5,500",
            "category": "linenshirt",
            "url": "https://www.nicobar.com/collections/shirt/products/classic-shirt-watermelon?_pos=3&_fid=3e8ff92da&_ss=c",
            "image": "https://placehold.co/600x400",
            "cloudinaryId": "placeholder_ls_32",
            "path": "path3"
        },
        {
            "name": "Royal Yellow Linen Luxury Shirt (Anniversary Edition)",
            "description": "Premium Irish linen craftsmanship, 4.4/5 luxury feel. Designer anniversary edition with single-needle lockstitch construction and superior durability. ₹7,000",
            "category": "linenshirt",
            "url": "https://priveeparis.in/products/royal-yellow-linen-luxury-shirt",
            "image": "https://placehold.co/600x400",
            "cloudinaryId": "placeholder_ls_33",
            "path": "path3"
        },
        {
            "name": "Heritage Collection - Royal Red Wedding Shirt",
            "description": "Hand-cut premium linen fabric, 4.3/5 elegance. Unique design with superior quality, made with premium materials for lasting sophistication. ₹4,600",
            "category": "linenshirt",
            "url": "https://priveeparis.in/products/heritage-collection-royal-red-wedding-shirt",
            "image": "https://placehold.co/600x400",
            "cloudinaryId": "placeholder_ls_34",
            "path": "path3"
        },
        {
            "name": "Bright White Luxurious Linen Shirt",
            "description": "Premium European linen, 4.2/5 quality. Mandarin and regular collar options available, crafted from finest linen with eco-friendly processes. ₹3,500-4,000",
            "category": "linenshirt",
            "url": "https://frenchcrown.in/products/bright-white-luxurious-linen-shirt-p?_pos=7&_fid=1e5ddaa36&_ss=c",
            "image": "https://placehold.co/600x400",
            "cloudinaryId": "placeholder_ls_35",
            "path": "path3"
        }
    
];

export async function POST() {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGOBD_URL!);
        }

        await Product.insertMany(products);

        return NextResponse.json({
            message: "Success! All products added to DB.",
            count: products.length
        }, { status: 201 });

    } catch (error) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ message: "Error seeding data", error }, { status: 500 });
    }
}