import subprocess
import sys
import tempfile

def get_dom(url, fresh_profile=True):
    temp_dir = tempfile.mkdtemp() if fresh_profile else None
    cmd = [
        'google-chrome',
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
    ]
    if temp_dir:
        cmd.append(f'--user-data-dir={temp_dir}')
    cmd.extend(['--dump-dom', url])
    res = subprocess.check_output(cmd, stderr=subprocess.DEVNULL).decode('utf-8')
    return res

def main():
    print("========================================")
    print("VERIFYING FEMME SCOOTY 50/50 COPY UPDATE")
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
    dom_women = get_dom('http://localhost:5173/', fresh_profile=True)

    # Entry Modal
    check("Welcome! Who is the training for? / Aap kiske liye training dekh rahe hain?" in dom_women,
          "Modal heading: 'Welcome! Who is the training for? / Aap kiske liye training dekh rahe hain?'")
    check("Women (Mahila)" in dom_women, "Modal option 1: 'Women (Mahila)'")
    check("100% Female Trainers • Ladies-Only" in dom_women, "Modal option 1 subtext: '100% Female Trainers • Ladies-Only'")
    check("Men (Purush)" in dom_women, "Modal option 2: 'Men (Purush)'")
    check("Experienced Male Trainers • All Ages" in dom_women, "Modal option 2 subtext: 'Experienced Male Trainers • All Ages'")

    # Nav
    check("About Us" in dom_women, "Nav link: 'About Us'")
    check("Courses" in dom_women, "Nav link: 'Courses'")
    check("Why Us" in dom_women, "Nav link: 'Why Us'")
    check("Reviews" in dom_women, "Nav link: 'Reviews'")
    check("Locations" in dom_women, "Nav link: 'Locations'")
    check("FAQs" in dom_women, "Nav link: 'FAQs'")
    check("Book a Slot" in dom_women, "Header CTA: 'Book a Slot'")
    check("♂ Men (Purush)" in dom_women, "Header switcher button: '♂ Men (Purush)'")

    # Hero & Marquee
    check("Learn Scooty With Confidence —" in dom_women and "Ab Bina Dar" in dom_women and "Chalayein!" in dom_women,
          "Hero headline: 'Learn Scooty With Confidence — Ab Bina Dar Chalayein!'")
    check("100% Female Trainers • Aapke Ghar Ke Paas • Free Scooty &amp; Petrol" in dom_women or "100% Female Trainers • Aapke Ghar Ke Paas • Free Scooty & Petrol" in dom_women,
          "Hero subtext: '100% Female Trainers • Aapke Ghar Ke Paas • Free Scooty & Petrol'")
    check("Call Now: +91 96256 95363" in dom_women, "Hero button: 'Call Now: +91 96256 95363'")
    check("WhatsApp Us" in dom_women, "Hero button: 'WhatsApp Us'")
    check("1000+ Students Trained" in dom_women, "Marquee contains '1000+ Students Trained'")
    check("Ages 16 to 60" in dom_women, "Marquee contains 'Ages 16 to 60'")
    check("Cycle Aati Ho Ya Nahi" in dom_women, "Marquee contains 'Cycle Aati Ho Ya Nahi'")
    check("Ghar Ke Paas Training" in dom_women, "Marquee contains 'Ghar Ke Paas Training'")

    # Callback Form
    check("Request a Free Callback" in dom_women, "Form heading: 'Request a Free Callback'")
    check("Your Name (Aapka Naam)" in dom_women, "Form label: 'Your Name (Aapka Naam)'")
    check("Mobile Number (+91)" in dom_women, "Form label: 'Mobile Number (+91)'")
    check("Select City (Shehar Chunein)" in dom_women, "Form label: 'Select City (Shehar Chunein)'")
    check("Select Course" in dom_women, "Form label: 'Select Course'")
    check("Request Callback" in dom_women, "Form button: 'Request Callback'")

    # Exactly 2 Courses
    check("7 Days Basic Course" in dom_women, "Course 1: '7 Days Basic Course'")
    check("Complete Beginners — Jinhe balance karna bhi nahi aata!" in dom_women, "Course 1 subtitle matches")
    check("No cycling experience needed (Cycle nahi aati? Koi baat nahi!)" in dom_women, "Course 1 bullet 1 matches")
    check("Training near your home (Aapke area ke paas safe roads par)" in dom_women, "Course 1 bullet 2 matches")
    check("Free scooty &amp; petrol included (no extra charges)" in dom_women or "Free scooty & petrol included (no extra charges)" in dom_women, "Course 1 bullet 3 matches")
    check("Patient female trainers &amp; flexible morning/evening slots" in dom_women or "Patient female trainers & flexible morning/evening slots" in dom_women, "Course 1 bullet 4 matches")
    check("Book Basic Course" in dom_women, "Course 1 CTA: 'Book Basic Course'")

    check("4 Days Advance Course" in dom_women, "Course 2: '4 Days Advance Course'")
    check("Traffic Confidence — Balance hai par road pe dar lagta hai!" in dom_women, "Course 2 subtitle matches")
    check("Real traffic riding &amp; confidence building" in dom_women or "Real traffic riding & confidence building" in dom_women, "Course 2 bullet 1 matches")
    check("U-turns, slopes, and emergency braking practice" in dom_women, "Course 2 bullet 2 matches")
    check("Free pickup &amp; drop for classes" in dom_women or "Free pickup & drop for classes" in dom_women, "Course 2 bullet 3 matches")
    check("Free scooty &amp; petrol included" in dom_women or "Free scooty & petrol included" in dom_women, "Course 2 bullet 4 matches")
    check("Book Advance Course" in dom_women, "Course 2 CTA: 'Book Advance Course'")

    check("License & Weekend Special" not in dom_women and "RTO Test aur Weekend Practice" not in dom_women,
          "No 3rd course ('License & Weekend Special' / 'RTO Test') present")

    # About Section
    check("Hamari Kahani —" in dom_women and "Scooty Freedom Starts Here!" in dom_women, "About heading: 'Hamari Kahani — Scooty Freedom Starts Here!'")
    check("Started in 2024 by Kajal Kaur with just 1 trainer and 1 scooty" in dom_women, "About founder story matches")
    check("Why should women depend on others for short distances?" in dom_women, "About core question matches")

    # Why Choose Us (6 Cards)
    check("100% Female Trainers" in dom_women, "Why Us card 1: '100% Female Trainers'")
    check("Safe, ladies-only environment (no male staff around)." in dom_women, "Why Us card 1 desc matches")
    check("Ghar Ke Paas Comfort" in dom_women, "Why Us card 2: 'Ghar Ke Paas Comfort'")
    check("Practice on safe, familiar roads near your home." in dom_women, "Why Us card 2 desc matches")
    check("Free Scooty &amp; Petrol" in dom_women or "Free Scooty & Petrol" in dom_women, "Why Us card 3: 'Free Scooty & Petrol'")
    check("Khud ki scooty nahi hai? Use ours at zero extra cost." in dom_women, "Why Us card 3 desc matches")
    check("No Age Bar (16–60)" in dom_women, "Why Us card 4: 'No Age Bar (16–60)'")
    check("16 saal ki student ho ya 60 saal ki homemaker, everyone learns at their own pace." in dom_women, "Why Us card 4 desc matches")
    check("Flexible Timings" in dom_women, "Why Us card 5: 'Flexible Timings'")
    check("Morning, evening, and weekend slots tailored to your schedule." in dom_women, "Why Us card 5 desc matches")
    check("Road &amp; Test Ready" in dom_women or "Road & Test Ready" in dom_women, "Why Us card 6: 'Road & Test Ready'")
    check("Practical training for parking, U-turns, and RTO driving tests." in dom_women, "Why Us card 6 desc matches")

    # Locations
    check("Our Training Cities — Hum Kahan Sikhate Hain?" in dom_women, "Locations heading: 'Our Training Cities — Hum Kahan Sikhate Hain?'")
    check("Search your area (Apna area likhein)..." in dom_women, "Search placeholder: 'Search your area (Apna area likhein)...'")
    check("Book in" in dom_women, "Locations city CTA button: 'Book in ...'")

    # FAQs
    check("Do I need to know cycling first? (Kya cycle chalani aani zaroori hai?)" in dom_women, "FAQ 1 matches")
    check("No! We teach balancing from day one." in dom_women, "FAQ 1 answer matches")
    check("Do I need my own scooty? (Kya khud ki scooty honi chahiye?)" in dom_women, "FAQ 2 matches")
    check("No, our scooty and petrol are included for free." in dom_women, "FAQ 2 answer matches")
    check("Will there be a female trainer? (Kya female trainer hi sikhayengi?)" in dom_women, "FAQ 3 matches")
    check("Yes, 100% female trainers with no male staff around." in dom_women, "FAQ 3 answer matches")
    check("Can I choose my class timing? (Kya main apna time slot choose kar sakti hoon?)" in dom_women, "FAQ 4 matches")
    check("Yes, morning, evening, and weekend slots are available." in dom_women, "FAQ 4 answer matches")

    # Footer
    check("Empowering women across Delhi NCR, Lucknow, Mathura, and Jodhpur with safe, stress-free scooter training." in dom_women,
          "Women footer blurb matches")

    # 2. MEN'S PAGE (/men)
    print("\n>>> Checking Men's Route (http://localhost:5173/men)...")
    dom_men = get_dom('http://localhost:5173/men', fresh_profile=True)

    check("Experienced Male Trainers • Aapke Ghar Ke Paas • Free Scooty &amp; Petrol" in dom_men or "Experienced Male Trainers • Aapke Ghar Ke Paas • Free Scooty & Petrol" in dom_men,
          "Men Hero subtext matches")
    check("Experienced Male Trainers" in dom_men, "Men Why Us card 1 matches")
    check("Will there be an experienced trainer? (Kya experienced trainer sikhayenge?)" in dom_men, "Men FAQ 3 matches")
    check("Yes, 100% certified male trainers with a patient, respectful approach." in dom_men, "Men FAQ 3 answer matches")
    check("Empowering learners across Delhi NCR, Lucknow, Mathura, and Jodhpur with safe, stress-free scooter training." in dom_men,
          "Men footer blurb matches")
    check("♀ Women (Mahila)" in dom_men, "Men header switcher button: '♀ Women (Mahila)'")

    print("\n========================================")
    if errors:
        print(f"FAILED with {len(errors)} error(s).")
        sys.exit(1)
    else:
        print(f"SUCCESS! All checks passed cleanly with 0 errors.")
        sys.exit(0)

if __name__ == '__main__':
    main()
