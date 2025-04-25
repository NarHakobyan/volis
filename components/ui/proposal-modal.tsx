import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Label } from "./label"
import { Checkbox } from "./checkbox"
import { Upload } from "lucide-react"

interface ProposalModalProps {
  trigger?: React.ReactNode
}

export function ProposalModal({ trigger }: ProposalModalProps) {
  const [files, setFiles] = useState<File[]>([])
  const [notifications, setNotifications] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement form submission
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button className="bg-blue-600 text-white hover:bg-blue-700">Esita ettepanek</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Esita ettepanek</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="submitter">Esitaja</Label>
              <Input required id="submitter" placeholder="Sinu nimi" />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="title">Nimetus</Label>
              <Input required id="title" placeholder="Ettepaneku pealkiri" />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="description">Kirjeldus</Label>
              <Textarea required id="description" placeholder="Ettepaneku detailne kirjeldus" />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="location">Asukoht</Label>
              <Input required id="location" placeholder="Projekti asukoht" />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="cost">Eeldatav maksumus</Label>
              <Input
                required
                id="cost"
                type="number"
                min="0"
                step="1000"
                placeholder="Summa eurodes"
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                type="email"
                placeholder="sinu@email.ee"
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                required
                id="phone"
                type="tel"
                placeholder="+372 5XXX XXXX"
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label>Failid</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Lisa failid
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles(Array.from(e.target.files))
                    }
                  }}
                />
              </div>
              {files.length > 0 && (
                <ul className="text-sm text-gray-600">
                  {files.map((file) => (
                    <li key={file.name}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="notifications"
                checked={notifications}
                onCheckedChange={(checked: boolean) => setNotifications(checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="notifications"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Teavituste tellimine
                </Label>
                <p className="text-sm text-muted-foreground">
                  Soovin e-posti teel infot ettepaneku edenemise kohta
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Tühista
              </Button>
            </DialogTrigger>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Esita ettepanek
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
