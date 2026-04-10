import PyPDF2
with open(r"C:\Users\Nandhika\Downloads\web-robo\ROSbot Brochure.pdf", "rb") as f:
    reader = PyPDF2.PdfReader(f)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
with open(r"C:\Users\Nandhika\Downloads\web-robo\pdf_out.txt", "w", encoding="utf-8") as out:
    out.write(text)
