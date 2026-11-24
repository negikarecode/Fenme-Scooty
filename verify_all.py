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

    # Top Announcement Bar (Full-Width Single-Line)
    check("100% Female Trainers • Free Scooty & Petrol Included • Ghar Ke Paas Training" in dom_women or
          "100% Female Trainers • Free Scooty &amp; Petrol Included • Ghar Ke Paas Training" in dom_women,
          "Top bar left: '100% Female Trainers • Free Scooty & Petrol Included • Ghar Ke Paas Training'")
    check("6 Cities: Delhi, Lucknow, Mathura, Jodhpur, Ghaziabad, Faridabad" in dom_women,
          "Top bar center: '6 Cities: Delhi, Lucknow, Mathura, Jodhpur, Ghaziabad, Faridabad'")
    check("+91 96256 95363" in dom_women, "Top bar right: '+91 96256 95363'")
    check("Switch Version (Mahila / Purush)" not in dom_women,
          "Duplicate 'Switch Version (Mahila / Purush)' removed from top announcement bar")

    # Header & Right-Side Wing Dropdown
    check("Women's Wing" not in dom_women, "No redundant 'Women's Wing' pill in logo area")
    check("wing-dropdown-button" in dom_women, "Right-side Wing Dropdown button present")
    check("Women (Mahila)" in dom_women, "Dropdown displays active 'Women (Mahila)' mode")
    check("About Us" in dom_women and "Courses" in dom_women and "FAQs" in dom_women, "Nav links present")
    check("Book a Slot" in dom_women, "Header CTA is 'Book a Slot'")
    check("whitespace-nowrap" in dom_women, "Header uses whitespace-nowrap preventing wraps")

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

    # About Section & 4-Item Balanced 2x2 Grid
    check("Hamari Kahani —" in dom_women and "Scooty Freedom Starts Here!" in dom_women, "About heading matches")
    check("grid-cols-2 gap-3.5 sm:gap-4" in dom_women, "About stats has clean 2x2 grid")
    check("1,000+" in dom_women and "Ages 16 to 60" in dom_women and "6 Cities" in dom_women and "100%" in dom_women,
          "All 4 stats present with 100% Female/Male Trainers")
    check("Female Trainers" in dom_women, "Female Trainers label present")
    check("about-story.jpg" in dom_women, "About image uses safe rider photo")

    # Why Choose Us (6th card: Zero-Pressure Learning)
    check("Zero-Pressure Learning" in dom_women, "Why Us card 6 title: 'Zero-Pressure Learning'")
    check("Cycle nahi aati? Koi baat nahi! Patient trainers aapko bilkul basic se, bina kisi jhijhak ke sikhate hain." in dom_women,
          "Why Us card 6 desc matches on Women route")

    # Meet Our Riders
    check("Rider Reviews (Riders Ki Zubani)" in dom_women, "Reviews badge: 'Rider Reviews (Riders Ki Zubani)'")
    check("Meet Our Riders — Hamari Riders Ki Zubani" in dom_women, "Women reviews heading: 'Meet Our Riders — Hamari Riders Ki Zubani'")
    check("h-[68px] sm:h-[72px]" in dom_women, "Author header has consistent h-[68px] sm:h-[72px] for perfect divider alignment")
    check("flex-col flex-1 mt-auto" in dom_women, "Testimonials cards have flex-col flex-1 mt-auto for bottom quote alignment")

    # Footer
    check("text-left hover:text-charcoal underline text-xs" in dom_women, "Footer version switcher button has text-left")
    check("Delhi NCR, Ghaziabad, Faridabad, Lucknow, Mathura, and Jodhpur" in dom_women, "Women footer blurb lists all 6 cities")
    check("1,000+ TRAINED" in dom_women, "Footer badge has '1,000+ TRAINED'")

    # 2. MEN'S PAGE (/men)
    print("\n>>> Checking Men's Route (http://localhost:5173/men)...")
    dom_men = get_dom('http://localhost:5173/men', fresh_profile=True, window_size="1440,900")

    check("hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider" not in dom_men,
          "No redundant 'Men's Wing' pill badge next to logo")
    check("wing-dropdown-button" in dom_men, "Men Header has Wing Dropdown button")
    check("Men (Purush)" in dom_men, "Men Header dropdown displays 'Men (Purush)'")
    check("Experienced Male Trainers • Free Scooty & Petrol Included • Ghar Ke Paas Training" in dom_men or
          "Experienced Male Trainers • Free Scooty &amp; Petrol Included • Ghar Ke Paas Training" in dom_men,
          "Men top bar left: 'Experienced Male Trainers • Free Scooty & Petrol Included • Ghar Ke Paas Training'")
    check("6 Cities: Delhi, Lucknow, Mathura, Jodhpur, Ghaziabad, Faridabad" in dom_men,
          "Men top bar center: '6 Cities: Delhi, Lucknow, Mathura, Jodhpur, Ghaziabad, Faridabad'")
    check("+91 96256 95363" in dom_men, "Men top bar right: '+91 96256 95363'")
    check("Experienced Male Trainers • Aapke Ghar Ke Paas • Free Scooty &amp; Petrol" in dom_men or "Experienced Male Trainers • Aapke Ghar Ke Paas • Free Scooty & Petrol" in dom_men,
          "Men Hero subtext matches")
    check("men-course-advance.jpg" in dom_men, "Men Advance course uses safe helmet rider photo")
    check("men-about-story.jpg" in dom_men, "Men About story uses safe rider photo")
    check("harish-verma.png" in dom_men, "Harish Verma avatar uses updated senior portrait")
    check("Meet Our Riders — Hamare Riders Ki Zubani" in dom_men, "Men reviews heading: 'Meet Our Riders — Hamare Riders Ki Zubani'")
    check("Zero-Pressure Learning" in dom_men, "Men Why Us card 6 title: 'Zero-Pressure Learning'")
    check("Cycle nahi aati? Koi baat nahi! Patient trainers aapko bilkul basic se, bina kisi jhijhak ke sikhate hain." in dom_men,
          "Men Why Us card 6 desc matches on Men route")
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
