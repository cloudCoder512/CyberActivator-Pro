        document.querySelectorAll('.download-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.download-card');
                let downloadType = "CyberActivator Setup.exe";
                if (card.classList.contains('card-portable')) {
                    downloadType = "Portable Version";
                } else if (card.classList.contains('card-windows7')) {
                    downloadType = "Windows 7 Version";
                }
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Download Started!';
                    this.style.background = 'linear-gradient(to right, #27ae60, #2ecc71)';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.opacity = '1';
                        
                        if (downloadType === "Main Installer") {
                            this.style.background = 'linear-gradient(to right, #1e3c72, #2a5298)';
                        } else if (downloadType === "Portable Version") {
                            this.style.background = 'linear-gradient(to right, #27ae60, #2ecc71)';
                        } else {
                            this.style.background = 'linear-gradient(to right, #c0392b, #e74c3c)';
                        }
                    }, 2000);
                }, 1500);
            });
        });
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.download-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 300 + (index * 200));
            });
        });
       function MainInstaller()
       {
            const fileName = "../Package/CyberActivatorPro.exe";
            const link = document.createElement('a');
            link.href = fileName;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert("Download successfully ");
       }
       function PortableVersion()
       {
            const fileName = "../Package/CyberActivatorPro.exe";
            const link = document.createElement('a');
            link.href = fileName;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert("Download successfully ");
       }
       function win7()
       {
            const fileName = "../Package/CyberActivatorPro.exe";
            const link = document.createElement('a');
            link.href = fileName;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert("Download successfully ");
       }