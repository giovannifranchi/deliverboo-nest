import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidTypology(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
       registerDecorator({
           name: 'IsValidTypology',
           target: object.constructor,
           propertyName: propertyName,
           constraints: [],
           options: validationOptions,
           validator: {
               async validate(value: number[], args: ValidationArguments) {
                  // Here, you'll use your Prisma client to check if the IDs exist in the `typologies` table
                  const prisma = args.constraints[0]; // or however you get the Prisma client in the context
                  if (!Array.isArray(value)) {
                      return false;
                  }
                  const typologies = await prisma.typologies.findMany({
                      where: {
                          id: {
                              in: value
                          }
                      },
                      select: {
                          id: true
                      }
                  });
                  return typologies.length === value.length;
               }
           }
       });
   };
}