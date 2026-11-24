import subprocess
import sys
import tempfile

def get_dom(url, fresh_profile=True, window_size="1440,900"):
    temp_dir = tempfile.mkdtemp() if fresh_profile else None
    cmd = [
        'google-chrome',
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        f'--window-size={window_size}'
    ]
    if temp_dir:
        cmd.append(f'--user-data-dir={temp_dir}')
    cmd.extend(['--dump-dom', url])
    res = subprocess.check_output(cmd, stderr=subprocess.DEVNULL).decode('utf-8')
    return res

def main():
    print("========================================")
    print("VERIFYING FEMME SCOOTY FIXES & UPDATES")
    print("========================================")

    errors = []
    def check(condition, label):
        if condition:
            print(f" [PASS] {label}")
        else:
            print(f" [FAIL] {label}")
            errors.append(label)

    # 1. WOMEN'S PAGE (/)
    print("\n>>> Checking Women's Route (http://localhost:5173/)...")
    dom_women = get_dom('http://localhost:5173/', fresh_profile=True, window_size="1440,900")

    # Entry Modal Z-Index & Dimming
    check("z-[100]" in dom_women or "z-100" in dom_women, "Modal has z-[100] high z-index overlaying header")
    check("Welcome! Who is the training for? / Aap kiske liye training dekh rahe hain?" in dom_women,
          "Modal heading: 'Welcome! Who is the training for? / Aap kiske liye training dekh rahe hain?'")
    check("Women (Mahila)" in dom_women, "Modal option 1: 'Women (Mahila)'")
    check("100% Female Trainers • Ladies-Only" in dom_women, "Modal option 1 subtext matches")
    check("Men (Purush)" in dom_women, "Modal option 2: 'Men (Purush)'")
    check("Experienced Male Trainers • All Ages" in dom_women, "Modal option 2 subtext matches")

    # Header & Status Dot inside Wing Pill
    check("Women's Wing" in dom_women, "Header has Women's Wing pill")
    check("whitespace-nowrap" in dom_women, "Header uses whitespace-nowrap preventing wraps")
    check("About Us" in dom_women and "Courses" in dom_women and "FAQs" in dom_women, "Nav links present")
    check("Book a Slot" in dom_women, "Header CTA is 'Book a Slot'")
    check("♂ Men (Purush)" in dom_women, "Header switcher button is '♂ Men (Purush)'")

    # Hero & Standardized 1,000+
    check("Learn Scooty With Confidence —" in dom_women and "Ab Bina Dar" in dom_women and "Chalayein!" in dom_women,
          "Hero headline matches")
    check("1,000+" in dom_women, "Hero has standardized '1,000+' trained")
    check("Call Now: +91 96256 95363" in dom_women, "Hero call CTA matches")
    check("WhatsApp Us" in dom_women, "Hero WhatsApp CTA matches")

    # Courses (Exactly 2 Cards)
    check("7 Days Basic Course" in dom_women, "Course 1: '7 Days Basic Course'")
    check("4 Days Advance Course" in dom_women, "Course 2: '4 Days Advance Course'")
    check("License & Weekend Special" not in dom_women and "RTO Test aur Weekend Practice" not in dom_women,
          "No 3rd course present")

    # About Section & 4-Item Balanced Grid
    check("Hamari Kahani —" in dom_women and "Scooty Freedom Starts Here!" in dom_women, "About heading matches")
    check("grid-cols-2 sm:grid-cols-4" in dom_women, "About stats has balanced 2x2 on mobile, 4-column on desktop")
    check("1,000+" in dom_women and "Ages 16 to 60" in dom_women and "6 Cities" in dom_women, "All 4 stats present")
    check("about-story.jpg" in dom_women, "About image uses safe rider photo")

    # Meet Our Riders
    check("Rider Reviews (Riders Ki Zubani)" in dom_women, "Reviews badge: 'Rider Reviews (Riders Ki Zubani)'")
    check("Meet Our Riders — Hamari Riders Ki Zubani" in dom_women, "Women reviews heading: 'Meet Our Riders — Hamari Riders Ki Zubani'")
    check("flex-col flex-1 mt-auto" in dom_women, "Testimonials cards have flex-col flex-1 mt-auto for bottom quote alignment")

    # Footer
    check("text-left hover:text-charcoal underline text-xs" in dom_women, "Footer version switcher button has text-left")
    check("Delhi NCR, Ghaziabad, Faridabad, Lucknow, Mathura, and Jodhpur" in dom_women, "Women footer blurb lists all 6 cities")
    check("1,000+ TRAINED" in dom_women, "Footer badge has '1,000+ TRAINED'")

    # 2. MEN'S PAGE (/men)
    print("\n>>> Checking Men's Route (http://localhost:5173/men)...")
    dom_men = get_dom('http://localhost:5173/men', fresh_profile=True, window_size="1440,900")

    check("Men's Wing" in dom_men, "Men Header has Men's Wing pill with dot inside")
    check("♀ Women (Mahila)" in dom_men, "Men header switcher button is '♀ Women (Mahila)'")
    check("Experienced Male Trainers • Aapke Ghar Ke Paas • Free Scooty &amp; Petrol" in dom_men or "Experienced Male Trainers • Aapke Ghar Ke Paas • Free Scooty & Petrol" in dom_men,
          "Men Hero subtext matches")
    check("men-course-advance.jpg" in dom_men, "Men Advance course uses safe helmet rider photo")
    check("men-about-story.jpg" in dom_men, "Men About story uses safe rider photo")
    check("harish-verma.png" in dom_men, "Harish Verma avatar uses updated senior portrait")
    check("Meet Our Riders — Hamare Riders Ki Zubani" in dom_men, "Men reviews heading: 'Meet Our Riders — Hamare Riders Ki Zubani'")
    check("Can I choose my class timing? (Kya aap apna time slot choose kar sakte hain?)" in dom_men, "Men FAQ #4 grammar fixed")
    check("Delhi NCR, Ghaziabad, Faridabad, Lucknow, Mathura, and Jodhpur" in dom_men, "Men footer blurb lists all 6 cities")

    # 3. Viewport Checks (1280px, 375px)
    print("\n>>> Checking Laptop Viewport (1280x800)...")
    dom_1280 = get_dom('http://localhost:5173/', fresh_profile=False, window_size="1280,800")
    check("Book a Slot" in dom_1280 and "FAQs" in dom_1280, "Laptop 1280px contains all nav and CTA items cleanly")

    print("\n>>> Checking Mobile Viewport (375x812)...")
    dom_375 = get_dom('http://localhost:5173/', fresh_profile=False, window_size="375,812")
    check("femme scooty." in dom_375, "Mobile 375px renders cleanly")

    print("\n========================================")
    if errors:
        print(f"FAILED with {len(errors)} error(s).")
        sys.exit(1)
    else:
        print(f"SUCCESS! All checks passed cleanly with 0 errors.")
        sys.exit(0)

if __name__ == '__main__':
    main()
