# Anlatım bölümlerini s1.mp3 ile s8.mp3 olarak üretir. Kullanım: python3 seslendirme.py tr-TR-AhmetNeural +10%
# Bölümler sırasıyla 1,2 5,5 16 26 34 40 46 ve 52,9. saniyelere yerleştirilip assets/anlatim.m4a dosyasında birleştirildi.
import asyncio, os, sys, edge_tts
SEG = [
 "Yapay zekâ destekli döngüsel batarya yönetim sistemi.",
 "Paylaşımlı filolarda batarya araç değiştirir. Kayıtlar batarya kimliğine bağlanmalıdır. Avrupa Birliği'nde pasaport yükümlülüğü 2027'de başlar.",
 "Sistem mevcut batarya verisini okur ve işler. Sağlık analiziyle bakım önceliğini belirler, pasaport kaydını oluşturur.",
 "Demoda beş yüz bataryalık sentetik bir filo var. Liste her uyarının nedenini gösterir.",
 "Telemetri ekranı beş dakikalık kayıtları olaysız durumla karşılaştırır.",
 "Pasaport ekranı kimlik, sağlık ve olay kayıtlarını QR koduyla açar.",
 "Sistem verileri yalnızca okur. Bakım kararını teknik personel verir.",
 "Proje teklif aşamasında, pilot çalışma planlanıyor. Ayrıntılar ve demo için QR kodunu okutunuz.",
]
async def main():
    px = os.environ.get('HTTPS_PROXY')
    for i, t in enumerate(SEG):
        await edge_tts.Communicate(t, sys.argv[1], rate=sys.argv[2], proxy=px).save(f"s{i+1}.mp3")
asyncio.run(main())
