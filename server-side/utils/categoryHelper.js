const kategoriKeywords = {
    "DAERAH JABATAN PENGAIRAN": ["DAERAH JABATAN PENGAIRAN"],
    "PEGAWAI DAERAH": ["JURUTERA DAERAH HULU", "KETUA PEN PEGAWAI DAERAH", "KETUA PENOLONG PEGAWAI DAERAH", "PEG DAERAH", "PEGAWAI DAERAH", "PEN PEGAWAI DAERAH", "PENOLONG PEGAWAI DAERAH",],
    "RUKUN TETANGGA": ["KAWASAN RUKUN TETANGGA", "RUKUN TETANGGA"]
}

const keywordCategoryMap = {};

Object.entries(kategoriKeywords).forEach(([category, keywords]) => {
    keywords.forEach((keywords) => {
        keywordCategoryMap[keywords] = category;
    });
});

module.exports ={kategoriKeywords, keywordCategoryMap};