using System.Diagnostics;
using System.Globalization;
using System.Text.RegularExpressions;
using static System.Net.Mime.MediaTypeNames;
using PhoneNumbers;

namespace PhoneNumberExtractor
{
    public partial class Form1 : Form
    {

        public Form1()
        {
            InitializeComponent();
            ParseOptions.Default.Countries.Clear();

            // One or more continent can be added.
            //ParseOptions.Default.AllowAfricanCountries();
            //ParseOptions.Default.AllowAsianCountries();
            ParseOptions.Default.AllowEuropeanCountries();
            ParseOptions.Default.AllowNorthAmericanCountries();
            //ParseOptions.Default.AllowOceanianCountries();
        }

        private void btnBrowse_Click(object sender, EventArgs e)
        {
            //folderBrowserDialog1 = new FolderBrowserDialog();
            folderBrowserDialog1.ShowNewFolderButton = false;

            DialogResult result = folderBrowserDialog1.ShowDialog();
            if (result == DialogResult.OK)
            {
                textFolderPath.Text = folderBrowserDialog1.SelectedPath; ;
            }
        }

        private async void btnExtract_Click(object sender, EventArgs e)
        {
            string selectedFolder = textFolderPath.Text;
            if (selectedFolder == null)
            {
                return;
            }

            if (Directory.Exists(selectedFolder) == false)
            {
                MessageBox.Show("Invalid folder", "Phone Number Extractor", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            System.IO.DirectoryInfo dir = new System.IO.DirectoryInfo(selectedFolder);
            IEnumerable<System.IO.FileInfo> fileList = dir.GetFiles("*.*");
            IEnumerable<System.IO.FileInfo> fileQuery =
                from file in fileList
                where file.Extension == ".csv" || file.Extension == ".txt"
                orderby file.Name
                select file;

            const string MatchPhonePattern = @"(?=\(|\b)(?:\+?1 ?[-.]?)?(?:\(\d{3}\)|\d{3}) ?[-.]? ?\d{3} ?[-.]? ?\d{4}\b";
            Regex rx = new Regex(MatchPhonePattern, RegexOptions.Compiled | RegexOptions.IgnoreCase);
            using StreamWriter outFile = new("Output.txt");
            if (fileQuery.Count() > 0)
            {
                foreach (var file in fileQuery)
                {
                    var fileContent = await File.ReadAllTextAsync(file.FullName);
                    MatchCollection matches = rx.Matches(fileContent);
                    int noOfMatches = matches.Count;
                    Debug.WriteLine(file.Name);
                    foreach (Match match in matches)
                    {
                        //Do something with the matches
                        string matchedPhoneNumber = match.Value.ToString(); ;
                        Debug.WriteLine(matchedPhoneNumber);
                        await outFile.WriteLineAsync(matchedPhoneNumber);
                    }
                }
            }
            MessageBox.Show("Done", "Phone Number Extractor", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}