import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ParticipantBudgetPage() {
  return (
    <div className="flex-1 bg-white">
      <div className="mx-6 py-8 flex flex-col gap-8">
        <Card className="overflow-hidden">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 p-4 text-sm">
            <Link href="/kov" className="text-[#003662] hover:underline">
              KOV avaleht
            </Link>
            <ChevronRight className="h-4 w-4 text-[#003662]" />
            <span className="text-[#003662]">Tartu kaasav eelarve 2024</span>
          </div>

          <div className="flex gap-4">
            {/* Image */}
          <div className="relative h-[400px] w-[500px]">
            <Image
              src="/images/participatory-budget.jpg"
              alt="Participatory Budget"
              fill
              className="object-cover"
            />
          </div>

          {/* Alert */}
          <Alert className="mx-4 bg-[#EAF6FF] border-[#337BB5]">
            <Info className="h-5 w-5" />
            <AlertTitle className="text-lg font-normal">
              Kaasava eelarve rahvahääletus toimus 10.-30. aprillil 2024
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm leading-[1.71]">
              Hääletus algab 5. oktoobril kell 00 (infokeskuses kell 10) ja lõpeb 11. oktoobril kell 18, mille järel antakse kohe teada ka tulemus.
              <br /><br />
              Hääletada saavad Tartu linna registreeritud elanikud alates 14. eluaastast ning kõik 14–26-aastased noored, kes õpivad Tartu linnas üldhariduskoolis, kutseõppeasutuses, rakenduskõrgkoolis või ülikoolis.
              <br /><br />
              Iga hääletusel osaleb isik saab hääletada KUNI KOLME ERINEVA idee poolt.
              <br /><br />
              Hääletada saab:
              <br />
              elektrooniliselt infosüsteemis Volis, kus tuleb end identifitseerida ID-kaardi, mobiili-ID või Smart-ID-ga.
              <br />
              Tartu raekoja infokeskuses (raekoja I korrus) kasutades infotöötaja abi. Esitada tuleb isikut tõendav dokument. Infokeskus on kõigil hääletuspäevadel avatud kell 10-18.
            </AlertDescription>
          </Alert>
          </div>

          {/* Table */}
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-[#000000] font-bold">
                  <th className="text-left py-2 px-4">Ettepaneku nr</th>
                  <th className="text-left py-2 px-4">Pealkiri</th>
                  <th className="text-left py-2 px-4">Eeldatav maksumus</th>
                  <th className="text-left py-2 px-4">Hääli</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C0C2C9]">
                {[
                  {
                    id: "01",
                    title: "Anne kanali ja Emajõe vaheline vabaajapark",
                    cost: "100 000 €",
                    votes: 552,
                  },
                  {
                    id: "02",
                    title: "Foorid nutikamaks ja inimsõbralikumaks",
                    cost: "170 000 €",
                    votes: 648,
                  },
                  {
                    id: "03",
                    title: "ISTLA – tegevusala noortele",
                    cost: "900 000 €",
                    votes: 166,
                  },
                  {
                    id: "04",
                    title: "Istumisplatvormid ja õpperajad Tähtvere dendroparki",
                    cost: "50 000 €",
                    votes: 313,
                  },
                  {
                    id: "05",
                    title: "Jalakäijate turvaala südalinnas",
                    cost: "",
                    votes: 155,
                  },
                ].map((item) => (
                  <tr key={item.id} className="text-sm">
                    <td className="py-4 px-4">{item.id}</td>
                    <td className="py-4 px-4">{item.title}</td>
                    <td className="py-4 px-4">{item.cost}</td>
                    <td className="py-4 px-4">
                      <Badge variant="success" className="font-normal">
                        {item.votes}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-[#878A97]">
            <span className="text-sm text-[#454854]">50 tulemust</span>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 rounded-full border-[#FFFFFF] disabled:opacity-50"
                disabled
              >
                <ChevronLeft className="h-4 w-4 text-[#C0C2C9]" />
              </Button>
              {[1, 2, 3, 4, 5, "...", 10].map((page, i) => (
                <Button
                  key={i}
                  variant={page === 1 ? "default" : "outline"}
                  className={`px-1 min-w-8 h-8 rounded-full ${
                    page === 1
                      ? "bg-[#005AA3] hover:bg-[#004882]"
                      : "border-[#005AA3] text-[#005AA3]"
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 rounded-full border-[#005AA3]"
              >
                <ChevronRight className="h-4 w-4 text-[#005AA3]" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#454854]">Näita korraga</span>
              <select className="h-8 px-2 border border-[#878A97] rounded text-sm">
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
