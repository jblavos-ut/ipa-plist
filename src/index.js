import JSZip from 'jszip';
import { parse } from '@plist/binary.parse';

document.getElementById('ipaFileInput').addEventListener('change', (event) => {
  const ipaFile = event.target.files[0];
  if (!ipaFile) return;

  const zip = new JSZip();
  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const ipaData = e.target.result;
      console.log('IPA data:', ipaData);

      const loadedZip = await zip.loadAsync(ipaData);
      console.log('Loaded zip:', loadedZip);

      const appFolderName = Object.keys(loadedZip.files).find((file) => file.includes('.app/'));
      console.log('App folder name:', appFolderName);

      const plistPath = `${appFolderName}Info.plist`;
      console.log('Plist path:', plistPath);

      const plistFile = await loadedZip.file(plistPath).async('uint8array');
      console.log('Plist file:', plistFile.buffer);

      const plistObject = parse(plistFile.buffer);
      console.log('Plist:', plistObject);
      var json = JSON.stringify(plistObject, null, 2);

      document.getElementById('ipaFileOutput').innerHTML = json;
      } catch (error) {
      console.error('Error processing IPA file:', error);
    }
  };

  reader.onerror = (error) => {
    console.error('Error reading IPA file:', error);
  };

  reader.readAsArrayBuffer(ipaFile);
});
