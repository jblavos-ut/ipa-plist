import JSZip from 'jszip';
import plist from 'plist';

document.getElementById('ipaFileInput').addEventListener('change', (event) => {
  const ipaFile = event.target.files[0];
  if (!ipaFile) return;

  const zip = new JSZip();
  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const ipaData = e.target.result;
      const loadedZip = await zip.loadAsync(ipaData);

      const appFolderName = Object.keys(loadedZip.files).find((file) => file.includes('.app/'));
      const plistPath = `${appFolderName}Info.plist`;

      const plistFile = await loadedZip.file(plistPath).async('uint8array');
      const plistContent = new TextDecoder().decode(plistFile);
      const plistObject = plist.parse(plistContent);

      console.log('Plist:', plistObject);
    } catch (error) {
      console.error('Error processing IPA file:', error);
    }
  };

  reader.onerror = (error) => {
    console.error('Error reading IPA file:', error);
  };

  reader.readAsArrayBuffer(ipaFile);
});
