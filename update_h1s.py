import os
import re

# Mapping: directory -> (H1 text, highlighted word)
pages_to_update = {
    # Redes e Infraestrutura
    'redes-e-infraestrutura/wifi-redes-sem-fio': ('Wi-Fi e Redes Sem Fio', 'Sem Fio'),
    'redes-e-infraestrutura/rede-cabeada': ('Rede Cabeada', 'Cabeada'),
    'redes-e-infraestrutura/cabeamento-estruturado': ('Cabeamento Estruturado', 'Estruturado'),
    'redes-e-infraestrutura/manutencao-de-redes': ('Manutenção de Redes', 'Redes'),
    'redes-e-infraestrutura/organizacao-de-cabos': ('Organização de Cabos', 'Cabos'),
    
    # Segurança Eletrônica
    'seguranca-eletronica/camera-de-seguranca': ('Câmera de Segurança', 'Segurança'),
    'seguranca-eletronica/alarme-de-seguranca': ('Alarme de Segurança', 'Segurança'),
    'seguranca-eletronica/controle-de-acesso': ('Controle de Acesso', 'Acesso'),
    'seguranca-eletronica/portao-eletronico': ('Portão Eletrônico', 'Eletrônico'),
    'seguranca-eletronica/cerca-eletrica': ('Cerca Elétrica', 'Elétrica'),
    'seguranca-eletronica/interfonia': ('Interfonia', 'Interfonia'),
}

base_path = r'c:\Users\Jonas\Desktop\tech-business'

for dir_path, (h1_text, highlight_word) in pages_to_update.items():
   file_path = os.path.join(base_path, dir_path, 'index.html')
    
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find and replace H1
    old_h1 = f"<h1>{h1_text}</h1>"
    new_h1 = f'<h1>{h1_text.replace(highlight_word, f\'<span class="highlight">{highlight_word}</span>\')} em Curitiba</h1>'
    
    content = content.replace(old_h1, new_h1)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated: {dir_path}")

print("\n🎉 All pages updated!")
