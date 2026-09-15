"use client";

import Image from "next/image";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  HeartIcon
} from "lucide-react";
import { type ReactNode, useState } from "react";

const WHATSAPP_NUMBER = "94704592759";
const PRODUCT_NAME = "මයිසූර් ආදිවාසී ඖෂධීය හිසකෙස් තෛලය";
const PRODUCT_SIZE = "100ml";
const SINGLE_BOTTLE_PRICE = 1400;
const TWO_BOTTLE_PRICE = 2600;
const DELIVERY_PRICE = 450;

const PRODUCTS = {
  single: {
    name: "Single Bottle",
    quantity: 1,
    price: 1400,
    delivery: 450
  },
  combo: {
    name: "2 Bottle Combo",
    quantity: 2,
    price: 2600,
    delivery: 0,
  }
} as const;

type ProductType = keyof typeof PRODUCTS;

type FeatureProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

type TrustItemProps = {
  icon: ReactNode;
  title: string;
};

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

type FaqProps = {
  question: string;
  answer: string;
};

type Review = {
  name: string;
  location: string;
  text: string;
  rating: number;
};

const customerReviews: Review[] = [
  {
    name: "පාරිභෝගික 01",
    location: "Sri Lanka",
    text: "තෙල් එක භාවිතා කරන්න පහසුයි. හිසකෙස් සඳහා හොඳ care එකක් ලබාගන්න පුළුවන් කියලා මට දැනුණා.",
    rating: 5
  }
];

function Feature({
  icon,
  title,
  description
}: FeatureProps) {
  return (
    <div className="group rounded-3xl border border-[#d4af37]/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/30 hover:bg-white/5.5">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4af37]/10 text-[#d4af37]">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-white/55">{description}</p>
    </div>
  );
}

function TrustItem({
  icon,
  title
}: TrustItemProps) {
  return (
    <div className="flex items-center justify-center gap-3 text-sm font-medium text-white/70">
      <span className="text-[#d4af37]">{icon}</span>
      <span>{title}</span>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children
}: InfoCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#d4af37]">{icon}</div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="text-sm leading-7 text-white/60">{children}</div>
    </div>
  );
}

function Faq({
  question,
  answer,
}: FaqProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-5 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-white">
          {question}
        </span>

        <ChevronDown
          size={20}
          className={`shrink-0 text-[#d4af37] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open
            ? "grid-rows-[1fr] pb-6"
            : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-7 text-white/55">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [productType, setProductType] = useState<"single" | "combo">("combo");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [reviewIndex, setReviewIndex] = useState(0);
  const selectedProduct = PRODUCTS[productType];

  const productPrice = selectedProduct.price;
  const deliveryPrice = selectedProduct.delivery;
  const totalPrice = productPrice + deliveryPrice;

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString("en-LK")}`;

  const nextReview = () => {
    setReviewIndex(
      (current) => (current + 1) % customerReviews.length
    );
  };

  const previousReview = () => {
    setReviewIndex(
      (current) => (current - 1 + customerReviews.length) % customerReviews.length
    )
  }

  const handleOrder = () => {
    if (!customerName.trim()) {
      alert("කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.");
      return;
    }
    if (!customerPhone.trim()) {
      alert("කරුණාකර දුරකථන අංකය ඇතුළත් කරන්න.");
      return;
    }
    if (!customerAddress.trim()) {
      alert("කරුණාකර ලිපිනය ඇතුළත් කරන්න.");
      return;
    }

    const message = `
*නව ඇණවුමක්*

━━━━━━━━━━━━━━━━━━

*පාරිභෝගික තොරතුරු*

*නම:* ${customerName}
*දුරකථන:* ${customerPhone}
*ලිපිනය:* ${customerAddress}

━━━━━━━━━━━━━━━━━━

*ඇණවුම් විස්තර*

*නිෂ්පාදනය:* ${PRODUCT_NAME}
*ප්‍රමාණය:* ${PRODUCT_SIZE}
*ගණන:* ${quantity}
*Type:* ${productType}

━━━━━━━━━━━━━━━━━━

*ගෙවීම් විස්තර*

*නිෂ්පාදන මිල:* රු. ${productPrice.toLocaleString()}

*බෙදාහැරීම:* ${deliveryPrice === 0
        ? "FREE"
        : `රු. ${deliveryPrice.toLocaleString()}`
      }

*මුළු මුදල:* රු. ${totalPrice.toLocaleString()}

━━━━━━━━━━━━━━━━━━

ස්තූතියි!`;

    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  const currentReview = customerReviews[reviewIndex];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a241a] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06130d]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-[#d4af37] sm:text-xl"
          >
            ආදිවාසී ඖෂධීය තෙල්
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            <a
              href="#benefits"
              className="text-sm text-white/60 transition hover:text-[#d4af37]"
            >
              ප්‍රතිලාභ
            </a>

            <a
              href="#details"
              className="text-sm text-white/60 transition hover:text-[#d4af37]"
            >
              නිෂ්පාදනය
            </a>

            <a
              href="#reviews"
              className="text-sm text-white/60 transition hover:text-[#d4af37]"
            >
              පාරිභෝගික අදහස්
            </a>

            <a
              href="#faq"
              className="text-sm text-white/60 transition hover:text-[#d4af37]"
            >
              ප්‍රශ්න
            </a>
          </nav>

          <a
            href="#order"
            className="flex items-center gap-2 rounded-full bg-[#d4af37] px-5 py-2.5 text-sm font-bold text-[#07130d] transition hover:bg-[#e5c45b]"
          >
            <MessageCircle size={17} />
            Order Now
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0a241a] py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-180px] top-[-120px] h-[500px] w-[500px] rounded-full bg-[#17613D]/20 blur-[140px]" />
          <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#0B2117]/80 px-4 py-2 backdrop-blur-sm">
              <Leaf
                size={14}
                className="text-[#D4AF37]"
              />
              <span className="text-[10px] font-semibold tracking-[0.08em] text-[#D8C28A] sm:text-xs">සාම්ප්‍රදායික ආයුර්වේද කේශ සත්කාරය</span>
            </div>
          </div>
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <div className="relative order-1 flex min-h-[520px] items-center justify-center lg:order-1">
              <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#17613D]/40 blur-[100px]" />
              <div className="absolute h-[390px] w-[390px] rounded-full border border-[#D4AF37]/10 sm:h-[460px] sm:w-[460px]" />
              <div className="absolute h-[320px] w-[320px] rounded-full border border-[#D4AF37]/10 sm:h-[380px] sm:w-[380px]" />
              <div className="relative z-10 w-[260px] sm:w-[310px] lg:w-[350px]">
                <Image
                  src="/product-bottle.png"
                  alt="ආයුර්වේද ඖෂධීය හිසකෙස් තෙල්"
                  width={650}
                  height={800}
                  priority
                  className="h-auto w-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.55)]"
                />
              </div>
              <div className="absolute left-2 top-8 z-20 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full border border-[#8C7027] bg-[#D4AF37] text-center text-[10px] font-black leading-tight text-[#071510] shadow-2xl sm:left-8">
                100%
                <br />
                ස්වාභාවිකයි
              </div>
              <div className="absolute bottom-4 right-0 z-20 rounded-2xl border border-white/10 bg-[#0D2119]/90 px-5 py-4 shadow-2xl backdrop-blur-md sm:right-8">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#819087]">Bottle Size</p>
                <p className="mt-1 text-xl font-black text-[#D4AF37]">{PRODUCT_SIZE}</p>
              </div>
            </div>
            <div className="relative z-10 order-2 lg:order-2">
              <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                ඔබේ හිසකෙස්වලට
                <br />
                <span className="text-[#D4AF37]">ස්වභාවික සත්කාරයක්.</span>
              </h1>
              <p className="mt-7 max-w-xl text-sm leading-7 text-[#AAB9AF] sm:text-base">
                දේශීය ඖෂධීය අමුද්‍රව්‍යවලින් සාම්ප්‍රදායිකව සකස් කළ
                කේශ සත්කාර තෙල්. ඔබගේ දෛනික හිසකෙස් සත්කාරයට
                පහසු සහ ස්වාභාවික තේරීමක්.
              </p>
              <div className="mt-9 grid max-w-xl grid-cols-2 gap-3">
                {[
                  {
                    icon: Check,
                    text: "කොණ්ඩය යාම පාලනයට",
                  },
                  {
                    icon: Check,
                    text: "හිස කෙස් ශක්තිමත් කිරීමට",
                  },
                  {
                    icon: Check,
                    text: "හිසේ හොරි පාලනයට",
                  },
                  {
                    icon: Check,
                    text: "නිරෝගී කෙස් කළඹකට",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.text}
                      className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 transition hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/5"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#145A3A]">
                        <Icon
                          size={14}
                          className="text-[#D4AF37]"
                        />
                      </span>
                      <span className="text-xs font-medium text-[#D5DED8] sm:text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-9 flex flex-wrap items-end gap-5">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#819087]">
                    විශේෂ මිල
                  </p>
                  <span className="text-4xl font-black text-[#D4AF37]">
                    රු. 1,400
                  </span>
                </div>
                <div className="mb-1 rounded-full border border-[#16C47A]/20 bg-[#16C47A]/5 px-3 py-1.5">
                  <span className="text-[10px] font-bold text-[#16C47A]">
                    {PRODUCT_SIZE}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#order"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16C47A] px-7 py-4 text-sm font-bold text-[#03150D] shadow-lg shadow-[#16C47A]/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#20D98A]"
                >
                  <MessageCircle size={19} />
                  WhatsApp හරහා ඇණවුම් කරන්න
                </a>

                <a
                  href="#details"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-medium text-[#D9D5C9] transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]"
                >
                  තවත් විස්තර
                </a>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/[0.07] pt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  <span className="text-[11px] text-[#819087]">
                    ආනයනය කරන ලද නිෂ්පාදනයක්
                  </span>
                </div>
                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-2">
                  <Leaf
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  <span className="text-[11px] text-[#819087]">
                    ඖෂධීය අමුද්‍රව්‍ය
                  </span>
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-2">
                  <Check
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  <span className="text-[11px] text-[#819087]">
                    දෛනික භාවිතයට
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-7 sm:grid-cols-4 lg:px-10">
          <TrustItem
            icon={<Leaf size={19} />}
            title="ස්වභාවික අමුද්‍රව්‍ය"
          />

          <TrustItem
            icon={<ShieldCheck size={19} />}
            title="ගුණාත්මක නිෂ්පාදනය"
          />

          <TrustItem
            icon={<Truck size={19} />}
            title="දිවයින පුරා Delivery"
          />

          <TrustItem
            icon={<MessageCircle size={19} />}
            title="පහසු WhatsApp Order"
          />
        </div>
      </section>

      <section
        id="benefits"
        className="relative py-24 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              ප්‍රධාන ප්‍රතිලාභ
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              හිසකෙස් සඳහා
              <span className="text-[#d4af37]">
                {" "}දෛනික සත්කාරයක්.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
              ස්වභාවික සත්කාරය ඔබේ දෛනික hair-care routine එකට පහසුවෙන්
              එක් කරගන්න.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<Leaf size={22} />}
              title="ස්වභාවික සත්කාරය"
              description="ස්වභාවික අමුද්‍රව්‍ය මත පදනම් වූ සරල hair-care solution එකක්."
            />

            <Feature
              icon={<Sparkles size={22} />}
              title="හිසකෙස් සත්කාරය"
              description="ඔබේ දෛනික හිසකෙස් සත්කාර routine එකට පහසුවෙන් එකතු කරගත හැක."
            />

            <Feature
              icon={<ShieldCheck size={22} />}
              title="ගුණාත්මකභාවය"
              description="නිෂ්පාදනයේ ගුණාත්මකභාවය සහ පිරිසිදුභාවය පිළිබඳ අවධානය."
            />

            <Feature
              icon={<HeartIcon />}
              title="පහසු භාවිතය"
              description="නිවසේදී පහසුවෙන් භාවිතා කළ හැකි practical hair-care product එකක්."
            />
          </div>
        </div>
      </section>

      <section
        id="details"
        className="border-y border-white/10 bg-white/[0.02] py-24 sm:py-28 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              නිෂ්පාදන විස්තර
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              ස්වභාවිකත්වය සමඟ
              <span className="text-[#d4af37]">
                {" "}ඔබේ hair care.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/55 sm:text-base">
              හිසකෙස් සඳහා දෛනික සත්කාරයක් ලබාදීම අරමුණු කරගත් මෙම
              ආයුර්වේද නිෂ්පාදනය පහසුවෙන් ඔබේ routine එකට එක් කළ හැක.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "ස්වභාවික අමුද්‍රව්‍ය මත පදනම් වූ සත්කාරයක්",
                "නිවසේදී පහසුවෙන් භාවිතා කළ හැක",
                "දෛනික hair-care routine එකට සුදුසුයි",
                "දිවයින පුරා බෙදාහැරීම ලබාගත හැක",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                    <Check size={13} />
                  </div>
                  <p className="text-sm text-white/65">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={<Leaf size={20} />}
              title="නිෂ්පාදනය"
            >
              {PRODUCT_NAME}
            </InfoCard>

            <InfoCard
              icon={<Sparkles size={20} />}
              title="ප්‍රමාණය"
            >
              {PRODUCT_SIZE}
            </InfoCard>

            <InfoCard
              icon={<Truck size={20} />}
              title="Delivery"
            >
              දිවයින පුරා බෙදාහැරීම
            </InfoCard>

            <InfoCard
              icon={<MessageCircle size={20} />}
              title="Order"
            >
              WhatsApp හරහා පහසුවෙන් ඇණවුම් කරන්න.
            </InfoCard>
          </div>
        </div>
      </section>

      <section
        id="reviews"
        className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
      >
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/5 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              පාරිභෝගික අදහස්
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              අපගේ පාරිභෝගිකයින්
              <span className="text-[#d4af37]">
                {" "}කියන්නේ.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
              අපගේ නිෂ්පාදනය පිළිබඳ පාරිභෝගික අත්දැකීම් මෙහි දක්වා ඇත.
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-3xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#d4af37]/15 bg-white/[0.035] p-7 shadow-2xl shadow-black/20 sm:p-10">
              <div className="absolute right-8 top-6 text-7xl font-serif leading-none text-[#d4af37]/10">"</div>
              <div className="relative">
                <div className="flex gap-1 text-[#d4af37]">
                  {Array.from({
                    length: currentReview.rating,
                  }).map((_, index) => (

                    <Star
                      key={index}
                      size={18}
                      fill="currentColor"
                      strokeWidth={1.5}
                    />

                  ))}
                </div>
                <p className="mt-7 text-lg leading-9 text-white/80 sm:text-xl">
                  “{currentReview.text}”
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/10 text-lg font-bold text-[#d4af37]">
                    {currentReview.name.charAt(
                      currentReview.name.length - 1
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {currentReview.name}
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      {currentReview.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-7 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={previousReview}
                aria-label="Previous review"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-[#d4af37]/40 hover:text-[#d4af37]"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {customerReviews.map(
                  (review, index) => (

                    <button
                      key={review.name}
                      type="button"
                      onClick={() =>
                        setReviewIndex(index)
                      }
                      aria-label={`Review ${index + 1
                        }`}
                      className={`h-2 rounded-full transition-all ${reviewIndex === index
                        ? "w-7 bg-[#d4af37]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                    />

                  )
                )}
              </div>
              <button
                type="button"
                onClick={nextReview}
                aria-label="Next review"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-[#d4af37]/40 hover:text-[#d4af37]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="order"
        className="border-y border-white/10 bg-[#091a11] py-24 sm:py-28 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              දැන් ඇණවුම් කරන්න
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              ඔබේ ඇණවුම
              <span className="text-[#d4af37]">
                {" "}දැන්ම යවන්න.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-8 text-white/50 sm:text-base">
              ඔබට අවශ්‍ය පැකේජය තෝරා පහත තොරතුරු ඇතුළත් කර
              Order Now ඔබන්න. ඔබගේ ඇණවුම් විස්තර WhatsApp හරහා
              අප වෙත යොමු වේ.
            </p>

            <div className="mt-9 space-y-4">
              {/* Single Bottle */}
              <button
                type="button"
                onClick={() => setProductType("single")}
                className={`w-full rounded-3xl border p-6 text-left transition ${productType === "single"
                  ? "border-[#d4af37]/60 bg-[#d4af37]/10"
                  : "border-white/10 bg-white/[0.035] hover:border-[#d4af37]/30"
                  }`}
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${productType === "single"
                        ? "border-[#d4af37] bg-[#d4af37]"
                        : "border-white/30"
                        }`}
                    >
                      {productType === "single" && (
                        <div className="h-2 w-2 rounded-full bg-[#07130d]" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                        Single Bottle
                      </p>

                      <h3 className="mt-1 font-semibold text-white">
                        {PRODUCT_NAME}
                      </h3>

                      <p className="mt-1 text-sm text-white/45">
                        {PRODUCT_SIZE} × 1
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-[#d4af37]">
                      රු. 1,400
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      + Delivery Rs. 450
                    </p>
                  </div>
                </div>
              </button>

              {/* Combo */}
              <button
                type="button"
                onClick={() => setProductType("combo")}
                className={`relative w-full rounded-3xl border p-6 text-left transition ${productType === "combo"
                  ? "border-[#16C47A]/60 bg-[#16C47A]/10"
                  : "border-white/10 bg-white/[0.035] hover:border-[#16C47A]/30"
                  }`}
              >
                <div className="absolute right-5 top-5 rounded-full bg-[#16C47A]/15 px-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#16C47A]">
                    Best Value
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 pr-20">
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${productType === "combo"
                        ? "border-[#16C47A] bg-[#16C47A]"
                        : "border-white/30"
                        }`}
                    >
                      {productType === "combo" && (
                        <div className="h-2 w-2 rounded-full bg-[#07130d]" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#16C47A]">
                        2 Bottle Combo
                      </p>

                      <h3 className="mt-1 font-semibold text-white">
                        {PRODUCT_NAME}
                      </h3>

                      <p className="mt-1 text-sm text-white/45">
                        {PRODUCT_SIZE} × 2
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-[#d4af37]">
                      රු. 2,600
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#16C47A]">
                      FREE Delivery
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Selected Product Summary */}
            <div className="mt-6 rounded-3xl border border-[#d4af37]/15 bg-[#d4af37]/5 p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs text-white/40">
                    තෝරාගත් පැකේජය
                  </p>

                  <h3 className="mt-2 font-semibold text-white">
                    {productType === "single"
                      ? "Single Bottle"
                      : "2 Bottle Combo"}
                  </h3>

                  <p className="mt-1 text-sm text-white/45">
                    {productType === "single"
                      ? "100ml × 1"
                      : "100ml × 2"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-white/40">
                    මුළු මුදල
                  </p>

                  <p className="mt-1 text-xl font-bold text-[#d4af37]">
                    රු. {totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="mb-2 block text-sm font-medium text-white/75"
                >
                  නම
                </label>

                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(event) =>
                    setCustomerName(event.target.value)
                  }
                  placeholder="ඔබගේ නම"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#d4af37]/50"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="customerPhone"
                  className="mb-2 block text-sm font-medium text-white/75"
                >
                  දුරකථන අංකය
                </label>

                <input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(event) =>
                    setCustomerPhone(event.target.value)
                  }
                  placeholder="07XXXXXXXX"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#d4af37]/50"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="customerAddress"
                  className="mb-2 block text-sm font-medium text-white/75"
                >
                  ලිපිනය
                </label>

                <textarea
                  id="customerAddress"
                  value={customerAddress}
                  onChange={(event) =>
                    setCustomerAddress(event.target.value)
                  }
                  placeholder="ඔබගේ සම්පූර්ණ ලිපිනය"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#d4af37]/50"
                />
              </div>

              {/* Delivery Message */}
              <div
                className={`rounded-xl border px-4 py-3 ${productType === "combo"
                  ? "border-[#16C47A]/20 bg-[#16C47A]/5"
                  : "border-[#d4af37]/10 bg-[#d4af37]/5"
                  }`}
              >
                {productType === "combo" ? (
                  <p className="text-xs font-semibold text-[#16C47A]">
                    ✓ 2 Bottle Combo — ඔබට FREE Delivery ලැබේ!
                  </p>
                ) : (
                  <p className="text-xs text-[#d4af37]">
                    💡 2 Bottle Combo එකක් ගන්නා විට Delivery FREE!
                  </p>
                )}
              </div>

              {/* Price Summary */}
              <div className="border-t border-white/10 pt-5">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-white/50">
                    <span>
                      {productType === "single"
                        ? "Single Bottle"
                        : "2 Bottle Combo"}
                    </span>

                    <span>
                      රු.{" "}
                      {productPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-white/50">
                    <span>
                      Delivery
                    </span>

                    <span
                      className={
                        deliveryPrice === 0
                          ? "font-semibold text-[#16C47A]"
                          : ""
                      }
                    >
                      {deliveryPrice === 0
                        ? "FREE"
                        : `රු. ${deliveryPrice.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-bold">
                    <span>
                      මුළු මුදල
                    </span>

                    <span className="text-xl text-[#d4af37]">
                      රු.{" "}
                      {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <button
                type="button"
                onClick={handleOrder}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d4af37] px-6 text-sm font-bold text-[#07130d] transition hover:bg-[#e5c45b]"
              >
                <MessageCircle size={20} />
                WhatsApp හරහා ඇණවුම් කරන්න
              </button>

              <p className="text-center text-xs leading-6 text-white/30">
                Button එක click කළ පසු WhatsApp වෙත ඔබගේ order
                details යොමු වේ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="py-24 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-4xl px-5 lg:px-10">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              FAQ
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">

              නිතර අසන

              <span className="text-[#d4af37]">
                {" "}ප්‍රශ්න.
              </span>

            </h2>
          </div>
          <div className="mt-12">
            <Faq
              question="Order එකක් දාන්නේ කොහොමද?"
              answer="ඔබගේ නම, දුරකථන අංකය සහ ලිපිනය ඇතුළත් කර WhatsApp හරහා ඇණවුම් කරන්න බොත්තම ඔබන්න. ඔබගේ order details WhatsApp වෙත යොමු වේ."
            />

            <Faq
              question="Delivery තියෙනවාද?"
              answer="ඔව්. එක් බෝතලයක් සඳහා Rs. 450 delivery ගාස්තුවක් අය කෙරේ. බෝතල් 2ක් හෝ ඊට වැඩි ප්‍රමාණයක් ඇණවුම් කරන විට delivery නොමිලේ ලබා දේ."
            />

            <Faq
              question="ගෙවීම් කරන්නේ කොහොමද?"
              answer="ඇණවුම තහවුරු කිරීමේදී ලබාදෙන payment instructions අනුව ගෙවීම් කළ හැක."
            />

            <Faq
              question="නිෂ්පාදනයේ ප්‍රමාණය කොපමණද?"
              answer={`නිෂ්පාදනයේ ප්‍රමාණය ${PRODUCT_SIZE} කි.`}
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#040d08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <a
              href="#"
              className="text-lg font-bold tracking-tight text-[#d4af37] sm:text-xl"
            >
              ආදිවාසී ඖෂධීය තෙල්
            </a>

            <p className="mt-3 max-w-sm text-xs leading-6 text-white/35">
              ස්වභාවික ආයුර්වේද සත්කාරය සමඟ ඔබේ දෛනික hair-care routine
              එක වඩාත් සරල කරගන්න.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs text-white/40">
            <a
              href="#benefits"
              className="transition hover:text-white"
            >
              ප්‍රතිලාභ
            </a>

            <a
              href="#details"
              className="transition hover:text-white"
            >
              නිෂ්පාදනය
            </a>

            <a
              href="#reviews"
              className="transition hover:text-white"
            >
              පාරිභෝගික අදහස්
            </a>

            <a
              href="#faq"
              className="transition hover:text-white"
            >
              FAQ
            </a>

            <a
              href="#order"
              className="transition hover:text-white"
            >
              Order
            </a>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-white/25 lg:px-10">
            © {new Date().getFullYear()} All Rights Reserved.
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition hover:scale-105"
      >
        <MessageCircle size={25} />
      </a>
    </main>
  );
}